import { feedCreateRequestDTO } from "../dto/Feed/request/feedCreateRequestDTO";
import { feedCreateResponseDTO, feedResponseDTO, levelUpResponseDTO, characterCardResponseDTO } from "../dto/Feed/response/feedCreateResponseDTO";
import { DeleteFeedResponseDTO } from "../dto/Feed/response/DeleteFeedResponseDTO";
import { User } from "../models/User";
import { Feed } from "../models/Feed";
import { Badge } from "../models/Badge";
import { levels }  from "../dummy/Level"
import { courses } from '../dummy/Course';
import { getYear, getMonth, getDay, getYesterday } from "../formatter/mohaengDateFormatter";
import { feedLengthCheck, notAuthorized, notExistFeedContent, notExistUser, notExsitFeed, serverError } from "../errors";
import { ReadFeedResponseDTO, FeedDTO, EmojiDTO } from "../dto/Feed/Read/response/ReadFeedResponseDTO";
import { Emoji } from "../models/Emoji";
const sequelize = require("sequelize");

export default {
  create:async(id: string, dto: feedCreateRequestDTO) => {
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

      let levelUpResponse: levelUpResponseDTO;
      if (levelUp) {
        //캐릭터카드 확정 후 수정 예정
        const characterCards: Array<characterCardResponseDTO> = new Array<characterCardResponseDTO>();
        characterCards.forEach((characterCard) => {
          const characterCardResponse: characterCardResponseDTO = {
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

      const feedResponse: feedResponseDTO = {
        happy: happy,
        userHappy: user.affinity,
        totalHappy: totalHappy,
        isPenalty: user.challenge_penalty || user.feed_penalty,
        levelUp: levelUpResponse
      }

      const responseDTO: feedCreateResponseDTO = {
        status: 200,
        data: feedResponse
      }
      return responseDTO;

    } catch (err) {
      console.error(err);
      return serverError;
    }
  },

  delete: async(user_id: string, id: string) => {
    try{
      const feed = await Feed.findOne({ where: {id: id} });
      if(!feed) {
        return notExsitFeed;
      }

      if (user_id == feed.user_id) {
        if (`${getYear(feed.create_time)}`==`${getYear(new Date())}` && `${getMonth(feed.create_time)}`==`${getMonth(new Date())}` && `${getDay(feed.create_time)}`==`${getDay(new Date())}`) {
          await User.update({ is_written: false, feed_penalty: true }, { where: { id: user_id } });
          await Feed.destroy({ where: {id: id} });
        }
        await Feed.destroy({ where: {id: id} });
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

}