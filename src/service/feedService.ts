import { CreateFeedRequestDTO } from "../dto/Feed/Create/request/CreateFeedRequestDTO";
import { CreateFeedResponseDTO, FeedResponseDTO, LevelUpResponseDTO, CharacterCardResponseDTO } from "../dto/Feed/Create/response/CreateFeedResponseDTO";
import { DeleteFeedResponseDTO } from "../dto/Feed/Delete/DeleteFeedResponseDTO";
import { User } from "../models/User";
import { Feed } from "../models/Feed";
import { Badge } from "../models/Badge";
import { levels }  from "../dummy/Level"
import { courses } from '../dummy/Course';
import { ReadFeedResponseDTO, FeedDTO, EmojiDTO } from "../dto/Feed/Read/response/ReadFeedResponseDTO";
import { getYear, getMonth, getYesterday, getDay } from "../formatter/mohaengDateFormatter";
import { alreadyExsitEmoji, feedLengthCheck, notAuthorized, notExistFeedContent, notExistUser, notExistEmoji, notExsitFeed, serverError, wrongEmojiId } from "../errors";
import { AddEmojiRequestDTO } from "../dto/Feed/Emoji/request/AddEmojiRequestDTO";
import { Emoji } from "../models/Emoji";
import { AddEmojiResponseDTO } from "../dto/Feed/Emoji/response/AddEmojiResponseDTO";
import { DeleteEmojiRequestDTO } from "../dto/Feed/Emoji/request/DeleteEmojiRequestDTO";
import { DeleteEmojiResponseDTO } from "../dto/Feed/Emoji/response/DeleteEmojiResponseDTO";
const sequelize = require("sequelize");

export default {
  create:async(id: string, dto: CreateFeedRequestDTO) => {
    try{
      const Op = sequelize.Op;
      const { mood, content, image, isPrivate } = dto;
      const user = await User.findOne({ where: {id: id} });
      if (!user) {
        return notExistUser;
      }

      if (!image && !content) {
        return notExistFeedContent;
      }

      if (content.length > 40) {
        return feedLengthCheck;
      }

      await Feed.create({
        user_id: id,
        nickname: user.nickname,
        current_course_id: user.current_course_id,
        current_challenge_id: user.current_course_id,
        mood: mood,
        content: content,
        image: image,
        isPrivate: isPrivate
      })
      user.feed_count=user.feed_count+1;

      //안부 연속 쓰기 성공 여부
      if (
        await Feed.findOne({
          where: { user_id: id, 
          create_time: {[Op.between]:
          [`${getYear(new Date())}-${getMonth(new Date())}-${getYesterday(new Date())}`, `${getYear(new Date())}-${getMonth(new Date())}-${getYesterday(new Date())} 23:59:59`]} }})
      ) {
        user.feed_success_count=user.feed_success_count+1;
      }
      else {
        user.feed_success_count=0;
      }
      
      //user 패널티 여부
      let happy;
      if (user.feed_penalty) {
        happy = 0;
      }
      else {
        happy = 15;
      }

      if (user.challenge_penalty) {
        happy = 0;
      }
      else {
        happy = 15;
      }
      user.affinity = user.affinity + happy;

      //level의 happy지수보다 user의 해피지수가 높다면 levelup
      let levelUp = false;
      let totalHappy = levels[user.level-1].getFullHappy();
      if (user.affinity>=totalHappy) {
        levelUp = true;
        user.affinity = user.affinity - totalHappy;
        user.level = ++user.level;
      }

      let levelUpResponse: LevelUpResponseDTO;
      if (levelUp) {
        //캐릭터카드 확정 후 수정 예정
        const characterCards: Array<CharacterCardResponseDTO> = new Array<CharacterCardResponseDTO>();
        characterCards.forEach((characterCard) => {
          const characterCardResponse: CharacterCardResponseDTO = {
            id: 1,
            image: "imageUrl"
          }
          characterCards.push(characterCardResponse);
        })
        
        //levelUp 했을 때만 아니면 null
        levelUpResponse = {
          level: user.level,
          characterType: 1,
          characterCard: characterCards
        }
      }

      //2: 안부 작성 [s] (초급) 1개 첫 안부 작성      
      let isBadgeNew = false;
      if (user.feed_count == 1) {
        isBadgeNew = true;
        await Badge.create({
          id: 2,
          user_id: id
        })
      }

      //5: 안부 작성 [s] (중급) 15개 행복한 작성러
      else if (user.feed_count == 15) {
        isBadgeNew = true;
        await Badge.create({
          id: 5,
          user_id: id
        })
      }

      //8: 안부 작성 작성 [s] (고급) 30개 프로 돌보미
      else if (user.feed_count == 30) {
        isBadgeNew = true;
        await Badge.create({
          id: 8,
          user_id: id
        })
      }

      //11: 안부 [s] 20일 연속 작성  꾸주니 꾸주니
      if (user.feed_success_count == 20) {
        isBadgeNew = true;
        await Badge.create({
          id: 11,
          user_id: id
        })
      }

      //12: 안부 피드에 공유하기 20회, 킹쉐어
      if (await Feed.count({ where: { user_id: id, isPrivate: false }}) == 19) {
        isBadgeNew = true;
        await Badge.create({
          id: 12,
          user_id: id
        })
      };

      if (isBadgeNew) {
        await User.update({
          affinity: user.affinity,
          level: user.level,
          is_written:true,
          feed_count: user.feed_count,
          badge_count: user.badge_count+1,
          is_feed_new: true,
          is_badge_new: isBadgeNew,
          feed_success_count: user.feed_success_count
        }, {
          where: { id: id }
        });
        
      } else {
        await User.update({
          affinity: user.affinity,
          level: user.level,
          is_written:true,
          feed_count: user.feed_count,
          is_feed_new: true,
          feed_success_count: user.feed_success_count
        }, {
          where: { id: id }
        });
      }

      const feedResponse: FeedResponseDTO = {
        happy: happy,
        userHappy: user.affinity,
        totalHappy: totalHappy,
        isPenalty: user.challenge_penalty || user.feed_penalty,
        levelUp: levelUpResponse
      }

      const responseDTO: CreateFeedResponseDTO = {
        status: 200,
        data: feedResponse
      }
      return responseDTO;

    } catch (err) {
      console.error(err);
      return serverError;
    }
  },

  delete: async(userId: string, id: string) => {
    try{
      const user = await User.findOne({ where: { id: userId }});
      if (!user) {
        return notExistUser;
      }
      const feed = await Feed.findOne({ where: {id: id}});
      if(!feed) {
        return notExsitFeed;
      }

      if (userId == feed.user_id) {
        if (`${getYear(feed.create_time)}`==`${getYear(new Date())}` && `${getMonth(feed.create_time)}`==`${getMonth(new Date())}` && `${getDay(feed.create_time)}`==`${getDay(new Date())}`) {
          await User.update({ is_written: false, feed_penalty: true }, { where: { id: userId } });
          await Feed.destroy({ where: {id: id} });
        }
        await Feed.destroy({ where: {id: id}});
      }
      else {
        return notAuthorized;
      }
      const responseDTO: DeleteFeedResponseDTO = {
        status: 200,
        message: "피드를 삭제했습니다."
      }
      return responseDTO;

    } catch(err){
      console.error(err);
      return serverError;
    }
  },

  emoji: async(userId: string, feedId: string, dto: AddEmojiRequestDTO) => {
    try{
      const user = await User.findOne({ where: { id: userId }});
      if (!user) {
        return notExistUser;
      }

      //잘못된 이모지 번호
      const { emojiId } = dto;
      const emojiNumber = +emojiId;
      if (emojiNumber == 0 || emojiNumber>6){
        return wrongEmojiId;
      }

      //이미 이모지가 있는 경우
      const emojiExist = await Emoji.findOne({ where: { emoji_id: emojiId, user_id: userId, feed_id: feedId }});
      if(emojiExist) {
        return alreadyExsitEmoji;
      }

      const emoji = await Emoji.findOne({ where: { user_id: userId, feed_id: feedId }});
      if (emoji) {
        await Emoji.update({ emoji_id: emojiId }, { where: { user_id: userId, feed_id: feedId }});
      }
      else {
        await Emoji.create({ emoji_id: emojiId, user_id: userId, feed_id: feedId });
      }

      const requestDTO: AddEmojiResponseDTO = {
        status: 200,
        message: "이모지를 추가하였습니다."
      };
      return requestDTO;

    } catch (err) {
      console.error(err);
      return serverError;
    }
  },

  deleteEmoji: async(userId: string, feedId: string, dto: DeleteEmojiRequestDTO) => {
    try{
      const user = await User.findOne({ where: { id: userId }});
      if (!user) {
        return notExistUser;
      }
      
      const { emojiId } = dto;
      const emoji = await Emoji.findOne({ where: { emoji_id: emojiId, user_id: userId, feed_id: feedId }});
      if(emoji) {
        await Emoji.destroy({where: { emoji_id: emojiId, user_id: userId, feed_id: feedId }});
      }
      else {
        return notExistEmoji;
      }

      const responseDTO: DeleteEmojiResponseDTO = {
        status: 200,
        message: "이모지를 삭제했습니다."
      }
      return responseDTO;

    } catch (err) {
      console.error(err);
      return serverError;
    }
  }
}