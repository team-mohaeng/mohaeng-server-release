import axios from 'axios';
import { s3 } from "../modules/upload"
import config from "../config"
import { CreateFeedRequestDTO } from "../dto/Feed/Create/request/CreateFeedRequestDTO";
import { CreateFeedResponseDTO, FeedResponseDTO, LevelUpResponseDTO } from "../dto/Feed/Create/response/CreateFeedResponseDTO";
import { DeleteFeedResponseDTO } from "../dto/Feed/Delete/DeleteFeedResponseDTO";
import { MyFeedResponseDTO, MyFeedDTO, FeedDTO, EmojiDTO } from "../dto/Feed/MyFeed/response/MyFeedResponseDTO";
import { CommunityDTO, CommunityResponseDTO } from "../dto/Feed/Community/CommunityResponseDTO";
import { AddEmojiRequestDTO } from "../dto/Feed/Emoji/request/AddEmojiRequestDTO";
import { AddEmojiResponseDTO } from "../dto/Feed/Emoji/response/AddEmojiResponseDTO";
import { DeleteEmojiRequestDTO } from "../dto/Feed/Emoji/request/DeleteEmojiRequestDTO";
import { DeleteEmojiResponseDTO } from "../dto/Feed/Emoji/response/DeleteEmojiResponseDTO";
import { ReportFeedResponseDTO } from "../dto/Feed/Report/ReportFeedResponseDTO";
import { User } from "../models/User";
import { Feed } from "../models/Feed";
import { Badge } from "../models/Badge";
import { Emoji } from "../models/Emoji";
import { Report } from "../models/Report";
import { Character } from "../models/Character";
import { Skin } from "../models/Skin";
import { levels }  from "../dummy/Level"
import { courses } from '../dummy/Course';
import { characterCards } from "../dummy/CharacterCard";
import { getYear, getMonth, getYesterday, getDay} from "../formatter/mohaengDateFormatter";
import { iosSkins, aosSkins } from "../dummy/Skin";
import { alreadyExsitEmoji, feedLengthCheck, notAuthorized, notExistFeedContent, notExistUser, notExistEmoji, notExistFeed, serverError, wrongEmojiId, alreadyReported, invalidReport } from "../errors";

const sequelize = require("sequelize");
const Op = sequelize.Op;

export default {
  create:async(id: string, dto: CreateFeedRequestDTO, client: string) => {
    try{
      const { mood, content, image, isPrivate } = dto;
      const user = await User.findOne({ where: { id: id }});
      if (!user) {
        return notExistUser;
      }

      if (!image && !content) {
        return notExistFeedContent;
      }

      if (content.length > 40) {
        return feedLengthCheck;
      }

      Feed.create({
        user_id: id,
        nickname: user.nickname,
        current_course_id: user.current_course_id,
        current_challenge_id: user.current_challenge_id,
        mood: mood,
        content: content,
        image: image,
        isPrivate: isPrivate
      })
      user.feed_count=user.feed_count+1;

      //안부 연속 쓰기 성공 여부
      const yesterdayFeed = await Feed.findOne({
        where: { user_id: id, 
        create_time: {[Op.between]:
        [`${getYear(new Date())}-${getMonth(new Date())}-${getYesterday(new Date())}`, `${getYear(new Date())}-${getMonth(new Date())}-${getYesterday(new Date())} 23:59:59`]}}
      })

      if (yesterdayFeed) {
        user.feed_success_count=user.feed_success_count + 1;
      }
      else {
        user.feed_success_count = 1;
      }
      
      //user 패널티 여부
      let happy;
      if (user.feed_penalty) {
        happy = 0;
      }
      else {
        happy = 10;
      }

      //만렙 달성
      if (user.level == 68) {
        happy = 0;
        user.affinity = 0;
      }

      user.affinity = user.affinity + happy;

      //level의 happy지수보다 user의 해피지수가 높다면 levelup
      let levelUp = false;
      let totalHappy = levels[user.level-1].getFullHappy();
      if (user.level < 68) {
        if (user.affinity >= totalHappy) {
          levelUp = true;
          user.affinity = user.affinity - totalHappy;
          user.level = ++user.level;
        }
      }
      
      let levelUpResponse: LevelUpResponseDTO = {};
      //levelUp 했을 때만 아니면 null
      if (levelUp) {
        let cardId = levels[user.level-2].getCardId();
        let image;
        //카드
        if (cardId < 64) {
          image = characterCards[cardId-1].getImageURL();
          const characterType = Number((cardId - 1)/9) + 1;
          Character.create({ user_id: +id, character_type: characterType, character_card: cardId });
        }
        //스킨
        else {
          image = (client == "ios") ? iosSkins[cardId-64].getImageURL() : aosSkins[cardId-64].getImageURL();
          Skin.create({ id: cardId, user_id: +id });
        }
        levelUpResponse = {
          level: user.level,
          styleImg: image 
        }
        User.update({ is_style_new: true }, { where: { id: id }})
      }

      let isBadgeNew = false;
      let badgeCount = 0;
      if (user.feed_count == 1) {
        //12: 안부 작성 1개, 첫 안부 작성
        const badge = await Badge.findOne({ where: { id: 12, user_id: id }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 12, user_id: id });
          ++badgeCount;
        }
      }

      //13: 안부 작성 15개, 행복한 작성러
      else if (user.feed_count == 15) {
        const badge = await Badge.findOne({ where: { id: 13, user_id: id }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 13, user_id: id});
          ++badgeCount;
        }
      }

      //14: 안부 작성 작성 30개, 프로 돌보미
      else if (user.feed_count == 30) {
        const badge = await Badge.findOne({ where: { id: 14, user_id: id }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 14, user_id: id});
          ++badgeCount;
        }
      }

      //15: 안부 20일 연속 작성, 꾸주니 꾸주니
      if (user.feed_success_count == 20) {
        const badge = await Badge.findOne({ where: { id: 15, user_id: id }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 15, user_id: id });
          ++badgeCount;
        }
      }

      //16: 공개 안부 작성 20개, 킹쉐어
      if (await Feed.count({ where: { user_id: id, isPrivate: false }}) == 19) {
        const badge = await Badge.findOne({ where: { id: 16, user_id: id }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 16, user_id: id });
          ++badgeCount;
        }
      };

      if (isBadgeNew) {
        User.update({
          affinity: user.affinity,
          level: user.level,
          feed_count: user.feed_count,
          badge_count: user.badge_count+badgeCount,
          feed_penalty: false,
          is_feed_new: true,
          is_badge_new: isBadgeNew,
          feed_success_count: user.feed_success_count
        }, {
          where: { id: id }
        });
        
      } else {
        User.update({
          affinity: user.affinity,
          level: user.level,
          feed_count: user.feed_count,
          feed_penalty: false,
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
      const user = await User.findOne({ attributes: ["is_feed_new", "feed_penalty", "feed_count", "feed_success_count"], where: { id: userId }}); 
      if (!user) {
        return notExistUser;
      }
      const feed = await Feed.findOne({ attributes: ["id", "user_id", "image", "create_time"], where: { id: id }}); 
      if(!feed) {
        return notExistFeed;
      }

      const todayFeed = `${getYear(feed.create_time)}`==`${getYear(new Date())}` && `${getMonth(feed.create_time)}`==`${getMonth(new Date())}` && `${getDay(feed.create_time)}`==`${getDay(new Date())}`;
      const yesterdayFeed = await Feed.findOne({
        attributes: ["id"],
        where: { user_id: userId, 
        create_time: {[Op.between]:
        [`${getYear(feed.create_time)}-${getMonth(feed.create_time)}-${getYesterday(feed.create_time)}`, `${getYear(feed.create_time)}-${getMonth(feed.create_time)}-${getYesterday(feed.create_time)} 23:59:59`]}}
      })

      //전날 피드가 있고 오늘 작성한 피드를 삭제할 경우 -> 피드 패널티, 연속 피드 작성 실패
      if (userId == feed.user_id && todayFeed && yesterdayFeed) {
        User.update({ is_feed_new: false, feed_count: user.feed_count-1, feed_penalty: true, feed_success_count: 1 }, { where: { id: userId }});
        Feed.destroy({ where: { id: id }});
      }

      //전날 피드가 없고 오늘 작성한 피드를 삭제할 경우 -> 피드 패널티
      else if (userId == feed.user_id && todayFeed) {
        User.update({ is_feed_new: false, feed_count: user.feed_count-1, feed_penalty: true }, { where: { id: userId }});
        Feed.destroy({ where: { id: id }});
      }
      
      //전날 피드가 있고 오늘 이전의 피드를 삭제할 경우 -> 피드 연속 작성 실패
      else if (userId == feed.user_id && yesterdayFeed) { 
        User.update({ feed_count: user.feed_count-1, feed_success_count: 1 }, { where: { id: userId }});
        Feed.destroy({ where: { id: id }});
      }

      //오늘 이전의 피드를 삭제할 경우
      else if (userId = feed.user_id) {
        User.update({ feed_count: user.feed_count-1 }, { where: { id: userId } });
        Feed.destroy({ where: { id: id }});
      }

      else {
        return notAuthorized;
      }

      const filename = feed.image.split("/")[5];
      s3.deleteObject({
        Bucket: config.awsBucket,
        Key: "images/origin/"+filename
      }, (err) => {
        if (err) { throw err; }
      })
      
      
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
      if (emojiNumber == 0 || emojiNumber > 6){
        return wrongEmojiId;
      }

      //이미 이모지가 있는 경우
      const emojiExist = await Emoji.findOne({ where: { emoji_id: emojiId, user_id: userId, feed_id: feedId }});
      if(emojiExist) {
        return alreadyExsitEmoji;
      }

      const feed = await Feed.findOne({ attributes: ["id", "user_id"], where: { id: feedId }});
      if (!feed) {
        return notExistFeed;
      }

      const emoji = await Emoji.findOne({ where: { user_id: userId, feed_id: feedId }});
      if (emoji) {
        await Emoji.update({ emoji_id: emojiId }, { where: { user_id: userId, feed_id: feedId }});
      }
      else {
        await Emoji.create({ emoji_id: emojiId, user_id: userId, feed_id: feedId });
      }

      //17: 스티커 붙이기 5개, 관심의 시작
      let isBadgeNew = false;
      let badgeCount = 0;
      const emojiCount = await Emoji.count({ where: { user_id: userId }});
      if (emojiCount == 5) {
        const badge = await Badge.findOne({ where: { id: 17, user_id: userId }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 17, user_id: userId })
          ++badgeCount;
        }
      }

      //18: 스티커 붙이기 30개, 관심 전달자
      else if (emojiCount == 30) {
        const badge = await Badge.findOne({ where: { id: 18, user_id: userId }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 18, user_id: userId });
          ++badgeCount;
        }
      }

      //19: 스티커 붙이기 60개, 모행의 마당발
      else if (emojiCount == 60) {
        const badge = await Badge.findOne({ where: { id: 19, user_id: userId }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 19, user_id: userId });
          ++badgeCount;
        }
      }

      if (isBadgeNew) {
        User.update({ is_badge_new: true, badge_count: user.badge_count+badgeCount }, { where: { id: userId }});
      }

      // 이모지 붙인 것이 자기자신이 아닐 경우 푸시알림 전송
      if (Number(feed.user_id) != Number(user.id)) {
        axios.request({
          method: 'GET',
          url: process.env.PUSH_URL,
          headers: {
            'feed-user-id': feed.user_id
          }
        });
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
        Emoji.destroy({ where: { emoji_id: emojiId, user_id: userId, feed_id: feedId }});
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
  },

  myFeed: async(userId: string, year: string, month: string) => {
    try{
      const user = await User.findOne({ attributes: ["current_challenge_id"], where: { id: userId }});
      if (!user) {
        return notExistUser;
      }
      await User.update({ is_feed_new: false }, { where: { id: userId }})
      
      const feedResponse: Array<FeedDTO> = new Array<FeedDTO>();
      const yearNumber = +year;
      const monthNumber = +month;
      const week = new Array("일", "월", "화", "수", "목", "금", "토");
      
      //한 달 동안 쓴 피드 모두 가져오기
      const myFeeds = await Feed.findAll({ 
        order: [["id", "DESC"]],
        where: { user_id: userId,
        create_time: {[Op.between]:
          [`${year}-${month}`, `${year}-${month}-${getDay(new Date(yearNumber, monthNumber, 0))} 23:59:59`] //달의 마지막날 구하기
      }}})

      const emojis = await Emoji.findAll();
      let emojiCount=[0, 0, 0, 0, 0, 0, 0]; //피드에 있는 이모지 개수 넣는 배열, emojiId 1~6, 0번째 요소는 사용X
      let emojiArray: Array<EmojiDTO> = new Array<EmojiDTO>(); //이모지 id랑 count 넣는 배열
      let myEmoji = 0; //조회하는 유저가 피드에 추가한 이모지, 0은 이모지 추가 안한 경우
      
      for (let i = 0; i < myFeeds.length; i++) {
        for (let j = 0; j < emojis.length; j++) {
          if (myFeeds[i].id == emojis[j].feed_id) { 
            const emojiId = emojis[j].emoji_id; //피드에 붙는 이모지 id
            if (emojiCount[emojiId] == 99) {
              emojiCount[emojiId] = 99;
            }
            else {
              emojiCount[emojiId]+=1; //count +1
            }
            

            if (userId == emojis[j].user_id) { //사용자가 피드에 이모지 붙였는지 여부
              myEmoji = +emojiId
            }
          }
        }

        for (let emojiNumber = 1; emojiNumber < 7; emojiNumber++) {
          if (emojiCount[emojiNumber] == 0) { //이모지 개수 0개면 skip
            continue;
          }
          const emoji: EmojiDTO = {
            id: emojiNumber,
            count: emojiCount[emojiNumber]
          }
          emojiArray.push(emoji);
        }
        
        const myFeed: FeedDTO = {
          postId: myFeeds[i].id,
          course: courses[myFeeds[i].current_course_id-1].getTitle(), //인덱스 때문에 -1
          challenge: myFeeds[i].current_challenge_id,
          image: myFeeds[i].image,
          mood: myFeeds[i].mood,
          content: myFeeds[i].content,
          nickname: myFeeds[i].nickname,
          year: getYear(myFeeds[i].create_time),
          month: getMonth(myFeeds[i].create_time),
          date: getDay(myFeeds[i].create_time),
          day: week[myFeeds[i].create_time.getDay()],
          emoji: emojiArray,
          myEmoji: myEmoji,
          isReport: false,
          isDelete: true
        }
        feedResponse.push(myFeed);
        //배열 초기화
        emojiArray=[];
        emojiCount=[0, 0, 0, 0, 0, 0, 0];
      }
      
      const myFeedDTO: MyFeedDTO = {
        feeds: feedResponse
      }

      const responseDTO: MyFeedResponseDTO = {
        status: 200,
        data: myFeedDTO
      }
      
      return responseDTO;
    }

    catch (err) {
      console.error(err);
      return serverError;
    }
  },

  feed: async(userId: string) => {
    try{
      const user = await User.findOne({ where: { id: userId }});
      if (!user) {
        return notExistUser;
      }

      let feed;
      const today = new Date();

      //12시 지났을 때 - 어제 새벽 5시부터 지금까지 피드 있는지 확인
      if (0 <= today.getHours() || today.getHours() < 5) {
        feed = await Feed.findOne({ attributes: ["id"], where: { user_id: userId, 
          create_time: {[Op.between]:
          [`${getYear(new Date())}-${getMonth(new Date())}-${getYesterday(new Date())} 05:00:00`, new Date()]}}
        });
      }
      //12시 이전일 때 - 오늘 새벽 5시부터 지금까지 피드 있는지 확인
      else {
        feed = await Feed.findOne({ attributes: ["id"], where: { user_id: userId, 
          create_time: {[Op.between]:
          [`${getYear(new Date())}-${getMonth(new Date())}-${getDay(new Date())} 05:00:00`, new Date()]}}
        });
      }
      
      //안부 작성 가능 여부
      let hasFeed;
      //피드 작성 가능
      if (!feed && user.is_completed) {
        hasFeed = 0;
      }
      //피드 이미 작성
      else if (feed) {
        hasFeed = 1;
      }
      //코스 수행 전
      else if (!user.current_course_id) {
        hasFeed = 2;
      }
      //챌린지 수행 전
      else if (!user.is_completed) {
        hasFeed = 2;
      }

      const userCount = await Feed.count({ 
        where: { create_time: {[Op.between]:
          [`${getYear(new Date())}-${getMonth(new Date())}-${getDay(new Date())}`, `${getYear(new Date())}-${getMonth(new Date())}-${getDay(new Date())} 23:59:59`]
      }}})
      
      const feedResponse: Array<FeedDTO> = new Array<FeedDTO>();
      const week = new Array("일", "월", "화", "수", "목", "금", "토");

      const feeds = await Feed.findAll({ order: [["id", "DESC"]], where: { isPrivate: false }});
      const emojis = await Emoji.findAll();
      let emojiCount=[0, 0, 0, 0, 0, 0, 0]; //이모지 개수 넣는 배열, emojiId 1~6, 0번째 요소는 사용X
      let emojiArray: Array<EmojiDTO> = new Array<EmojiDTO>(); //이모지 id랑 count 넣는 배열
      let myEmoji = 0; //조회하는 유저가 피드에 추가한 이모지, 0은 이모지 추가 안한 경우
      
      for (let i = 0; i < feeds.length; i++) {
        for (let j = 0; j < emojis.length; j++) {
          if (feeds[i].id == emojis[j].feed_id) { 
            const emojiId = emojis[j].emoji_id; //피드에 붙는 이모지 id
            if (emojiCount[emojiId] == 99) {
              emojiCount[emojiId] = 99;
            }
            else {
              emojiCount[emojiId]+=1; //count +1
            }

            if (userId == emojis[j].user_id) { //사용자가 피드에 이모지 붙였는지 여부
              myEmoji = +emojiId
            }
          }
        }

        for (let emojiNumber = 1; emojiNumber < 7; emojiNumber++) {
          if (emojiCount[emojiNumber] == 0) { //이모지 개수 0개면 skip
            continue;
          }
          const emoji: EmojiDTO = {
            id: emojiNumber,
            count: emojiCount[emojiNumber]
          }
          emojiArray.push(emoji);
        }

        //신고 가능 여부
        const isReport = (user.nickname!=feeds[i].nickname) ? true : false;
        //삭제 가능 여부
        const isDelete = (user.nickname==feeds[i].nickname) ? true : false;

        const myFeed: FeedDTO = {
          postId: feeds[i].id,
          course: courses[feeds[i].current_course_id-1].getTitle(), //인덱스 때문에 -1
          challenge: feeds[i].current_challenge_id,
          image: feeds[i].image,
          mood: feeds[i].mood,
          content: feeds[i].content,
          nickname: feeds[i].nickname,
          year: getYear(feeds[i].create_time),
          month: getMonth(feeds[i].create_time),
          date: getDay(feeds[i].create_time),
          day: week[feeds[i].create_time.getDay()],
          emoji: emojiArray,
          myEmoji: myEmoji,
          isReport: isReport,
          isDelete: isDelete
        }
        feedResponse.push(myFeed);
        //배열 초기화
        emojiArray=[];
        emojiCount=[0, 0, 0, 0, 0, 0, 0];
      }

      const community: CommunityDTO = {
        isNew: user.is_feed_new,
        hasFeed: hasFeed,
        userCount: userCount,
        feeds: feedResponse
      }

      const responseDTO: CommunityResponseDTO = {
        status: 200,
        data: community
      }
      return responseDTO;

    } catch(err) {
        console.error(err);
        return serverError;
    }
  },

  report: async(userId: string, postId: string) => {
    try {
      const user = await User.findOne({ attributes: ["id"], where: { id: userId }});
      if (!user) {
        return notExistUser;
      }
      
      const report = await Report.findOne({ where: { user_id: userId, post_id: postId }});
      if (report) {
        return alreadyReported;
      }

      const feed = await Feed.findOne({ attributes: ["user_id", "create_time"], where: { id: postId }});
      if (!feed) {
        return notExistFeed;
      }
      
      if (feed.user_id == userId) {
        return invalidReport;
      }

      const reportCount = await Report.count({ where: { post_id: postId }});
      if (reportCount == 2) {
        Feed.destroy({ where: { id: postId }});

        const reportedUser = await User.findOne({ attributes: ["feed_count"], where: { id: feed.user_id }});
        if (!reportedUser) {
          return notExistUser;
        }

        const todayFeed = `${getYear(feed.create_time)}`==`${getYear(new Date())}` && `${getMonth(feed.create_time)}`==`${getMonth(new Date())}` && `${getDay(feed.create_time)}`==`${getDay(new Date())}`;
        const yesterdayFeed = await Feed.findOne({
          attributes: ["id"],
          where: { user_id: feed.user_id, 
          create_time: {[Op.between]:
          [`${getYear(feed.create_time)}-${getMonth(feed.create_time)}-${getYesterday(feed.create_time)}`, `${getYear(feed.create_time)}-${getMonth(feed.create_time)}-${getYesterday(feed.create_time)} 23:59:59`]}}
        })

        //전날 피드가 있는 오늘 피드가 삭제될 경우 -> 피드 재작성 가능, 연속 피드 작성 실패
        if (todayFeed && yesterdayFeed) {
          User.update({ is_feed_new: false, feed_count: reportedUser.feed_count-1, feed_success_count: 1 }, { where: { id: feed.user_id }});
        }

        //전날 피드가 있는 피드가 삭제될 경우 -> 연속 피드 작성 실패
        else if (yesterdayFeed) {
          User.update({ feed_count: reportedUser.feed_count-1, feed_success_count: 1 }, { where: { id: feed.user_id }});
        }

        //전날 피드가 없는 피드가 삭제될 경우
        else {
          User.update({ feed_count: reportedUser.feed_count-1 }, { where: { id: feed.user_id }});
        }
      }

      else {
        Report.create({ user_id: +userId, post_id: +postId });
      }

      const responseDTO: ReportFeedResponseDTO = {
        status: 200,
        message: "안부를 신고하였습니다."
      }
      return responseDTO
    }
    
    catch(err) {
      console.error(err);
      return serverError;
    }
  }
}