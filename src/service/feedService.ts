import axios from 'axios';
import { s3 } from "../modules/upload";
import config from "../config";
import sendReport from "../controller/sendReport";
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
import { Block } from '../models/Block';
import { levels }  from "../dummy/Level";
import { courses } from '../dummy/Course';
import { iosSkins, aosSkins } from "../dummy/Skin";
import { characterCards } from "../dummy/CharacterCard";
import { getYear, getMonth, getYesterday, getDay, getTwodaysAgo, getTwoDaysLater} from "../formatter/mohaengDateFormatter";
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

      const today = new Date();
      //?????? ??????
      const yesterday = getYesterday(new Date());
      const year = getYear(yesterday);
      const month = getMonth(yesterday);
      const day = getDay(yesterday);

      //????????? ??????
      const twoDaysAgo = getTwodaysAgo(new Date());
      const year2 = getYear(twoDaysAgo);
      const month2 = getMonth(twoDaysAgo);
      const day2 = getDay(twoDaysAgo);

      let yesterdayFeed;
      //?????? ?????? ?????? ??????
      //00??? - 05??? - ????????? ?????? ??????
      if (0 <= today.getHours() && today.getHours() < 5) {
        yesterdayFeed = await Feed.findOne({ attributes: ["id"], where: { user_id: id, 
          create_time: {[Op.betweesn]:
          [`${year2}-${month2}-${day2} 05:00:00`, `${year}-${month}-${day} 04:59:59`]}}
        });
      }
      //05??? - 00??? - ?????? ?????? ??????
      if (today.getHours() >= 5) {
        yesterdayFeed = await Feed.findOne({ attributes: ["id"], where: { user_id: id, 
          create_time: {[Op.between]:
          [`${year}-${month}-${day} 05:00:00`, `${getYear(today)}-${getMonth(today)}-${getDay(today)} 04:59:59`]}}
        });
      }

      if (yesterdayFeed) {
        user.feed_success_count=user.feed_success_count + 1;
      }
      else {
        user.feed_success_count = 1;
      }
      
      //user ????????? ??????
      let happy;
      if (user.feed_penalty) {
        happy = 0;
      }
      else {
        happy = 10;
      }

      //?????? ??????
      if (user.level == 68) {
        happy = 0;
        user.affinity = 0;
      }

      user.affinity = user.affinity + happy;

      //level??? happy???????????? user??? ??????????????? ????????? levelup
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
      //levelUp ?????? ?????? ????????? null
      if (levelUp) {
        let cardId = levels[user.level-2].getCardId();
        let image;
        //??????
        if (cardId < 64) {
          image = characterCards[cardId-1].getImageURL();
          const characterType = Math.floor(Number((cardId - 1) / 9)) + 1;
          Character.create({ user_id: +id, character_type: characterType, character_card: cardId });
        }
        //??????
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
        //12: ?????? ?????? 1???, ??? ?????? ??????
        const badge = await Badge.findOne({ where: { id: 12, user_id: id }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 12, user_id: id });
          ++badgeCount;
        }
      }

      //13: ?????? ?????? 15???, ????????? ?????????
      else if (user.feed_count == 15) {
        const badge = await Badge.findOne({ where: { id: 13, user_id: id }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 13, user_id: id});
          ++badgeCount;
        }
      }

      //14: ?????? ?????? ?????? 30???, ?????? ?????????
      else if (user.feed_count == 30) {
        const badge = await Badge.findOne({ where: { id: 14, user_id: id }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 14, user_id: id});
          ++badgeCount;
        }
      }

      //15: ?????? 20??? ?????? ??????, ????????? ?????????
      if (user.feed_success_count == 20) {
        const badge = await Badge.findOne({ where: { id: 15, user_id: id }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 15, user_id: id });
          ++badgeCount;
        }
      }

      //16: ?????? ?????? ?????? 20???, ?????????
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
      
      
      const today = new Date();
      const time = parseInt(feed.create_time.toLocaleTimeString('en-GB').split(":")[0]); //?????? ?????? ??????
      const currentTime = today.getHours(); //?????? ??????
      console.log(time);

      let todayFeed;
      let yesterdayFeed;

      //?????? ??????
      const yesterday = getYesterday(new Date());
      const year = getYear(yesterday);
      const month = getMonth(yesterday);
      const day = getDay(yesterday);

      //?????? ?????? ??? ?????? (????????? ????????? ?????? ????????? ????????? ????????? ??? ??????)
      const preDay1 = getYesterday(feed.create_time);
      const year1 = getYear(preDay1);
      const month1 = getMonth(preDay1);
      const day1 = getDay(preDay1);

      //?????? ?????? ????????? ??????
      const preDay2 = getYesterday(feed.create_time);
      const year2 = getYear(preDay2);
      const month2 = getMonth(preDay2);
      const day2 = getDay(preDay2);

      //?????? ?????? ?????? ????????????
      const feedDate = getTwoDaysLater(feed.create_time);

      //??????????????? ????????? ?????? ????????? ???????????? ??????, ?????? ?????? ?????? ?????? ??????
      if (0 <= time && time<5) {
        todayFeed = getYear(feedDate) == getYear(today) && getMonth(feedDate) == getMonth(today) && getDay(feedDate) == getDay(today);
        yesterdayFeed = await Feed.findOne({ attributes: ["id"], where: { user_id: userId, 
          create_time: {[Op.between]:
          [`${year2}-${month2}-${day2} 05:00:00`, `${year1}-${month1}-${day1} 04:59:59`]}}
        });
      }

      if (time>=5) {
        if (0 <= currentTime && currentTime<5) {
          todayFeed = getYear(feedDate) == year && getMonth(feedDate) == month && getDay(feedDate) == day;
        }
        if (currentTime >=5) {
          todayFeed = getYear(feedDate) == getYear(today) && getMonth(feedDate) == getMonth(today) && getDay(feedDate) == getDay(today);
        }
        yesterdayFeed = await Feed.findOne({ attributes: ["id"], where: { user_id: userId, 
          create_time: {[Op.between]:
          [`${year1}-${month1}-${day1} 05:00:00`, `${getYear(feedDate)}-${getMonth(feedDate)}-${getDay(feedDate)} 04:59:59`]}}
        });
      }

      console.log(todayFeed);
      console.log(yesterdayFeed);

      //?????? ????????? ?????? ?????? ????????? ????????? ????????? ?????? -> ?????? ?????????, ?????? ?????? ?????? ??????
      if (userId == feed.user_id && todayFeed && yesterdayFeed) {
        User.update({ is_feed_new: false, feed_count: user.feed_count-1, feed_penalty: true, feed_success_count: 1 }, { where: { id: userId }});
        Feed.destroy({ where: { id: id }});
      }

      //?????? ????????? ?????? ?????? ????????? ????????? ????????? ?????? -> ?????? ?????????
      else if (userId == feed.user_id && todayFeed) {
        User.update({ is_feed_new: false, feed_count: user.feed_count-1, feed_penalty: true }, { where: { id: userId }});
        Feed.destroy({ where: { id: id }});
      }
      
      //?????? ????????? ?????? ?????? ????????? ????????? ????????? ?????? -> ?????? ?????? ?????? ??????
      else if (userId == feed.user_id && yesterdayFeed) { 
        User.update({ feed_count: user.feed_count-1, feed_success_count: 1 }, { where: { id: userId }});
        Feed.destroy({ where: { id: id }});
      }

      //?????? ????????? ????????? ????????? ??????
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
        message: "????????? ??????????????????."
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

      //????????? ????????? ??????
      const { emojiId } = dto;
      const emojiNumber = +emojiId;
      if (emojiNumber == 0 || emojiNumber > 6){
        return wrongEmojiId;
      }

      //?????? ???????????? ?????? ??????
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

      //17: ????????? ????????? 5???, ????????? ??????
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

      //18: ????????? ????????? 30???, ?????? ?????????
      else if (emojiCount == 30) {
        const badge = await Badge.findOne({ where: { id: 18, user_id: userId }});
        if (!badge) {
          isBadgeNew = true;
          Badge.create({ id: 18, user_id: userId });
          ++badgeCount;
        }
      }

      //19: ????????? ????????? 60???, ????????? ?????????
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

      // ????????? ?????? ?????? ??????????????? ?????? ?????? ???????????? ??????
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
        message: "???????????? ?????????????????????."
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
        message: "???????????? ??????????????????."
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
      const week = new Array("???", "???", "???", "???", "???", "???", "???");
      
      //??? ??? ?????? ??? ?????? ?????? ????????????
      const myFeeds = await Feed.findAll({ 
        order: [["id", "DESC"]],
        where: { user_id: userId,
        create_time: {[Op.between]:
          [`${year}-${month}`, `${year}-${month}-${getDay(new Date(yearNumber, monthNumber, 0))} 23:59:59`] //?????? ???????????? ?????????
      }}})

      const emojis = await Emoji.findAll();
      let emojiCount=[0, 0, 0, 0, 0, 0, 0]; //????????? ?????? ????????? ?????? ?????? ??????, emojiId 1~6, 0?????? ????????? ??????X
      let emojiArray: Array<EmojiDTO> = new Array<EmojiDTO>(); //????????? id??? count ?????? ??????
      let myEmoji = 0; //???????????? ????????? ????????? ????????? ?????????, 0??? ????????? ?????? ?????? ??????
      
      for (let i = 0; i < myFeeds.length; i++) {
        for (let j = 0; j < emojis.length; j++) {
          if (myFeeds[i].id == emojis[j].feed_id) { 
            const emojiId = emojis[j].emoji_id; //????????? ?????? ????????? id
            if (emojiCount[emojiId] == 99) {
              emojiCount[emojiId] = 99;
            }
            else {
              emojiCount[emojiId]+=1; //count +1
            }
            

            if (userId == emojis[j].user_id) { //???????????? ????????? ????????? ???????????? ??????
              myEmoji = +emojiId
            }
          }
        }

        for (let emojiNumber = 1; emojiNumber < 7; emojiNumber++) {
          if (emojiCount[emojiNumber] == 0) { //????????? ?????? 0?????? skip
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
          course: courses[myFeeds[i].current_course_id-1].getTitle(), //????????? ????????? -1
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
        //?????? ?????????
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
      let userCount;
      const today = new Date();
      //?????? ??????
      const yesterday = getYesterday(new Date());
      const year = getYear(yesterday);
      const month = getMonth(yesterday);
      const day = getDay(yesterday);

      //12??? ????????? ??? - ?????? ?????? 5????????? ???????????? ?????? ????????? ??????, ?????? ?????? ??????
      if (0 <= today.getHours() && today.getHours() < 5) {
        feed = await Feed.findOne({ attributes: ["id"], where: { user_id: userId, 
          create_time: {[Op.between]:
          [`${year}-${month}-${day} 05:00:00`, new Date()]}}
        });
        userCount = await Feed.count({ where: { 
          create_time: {[Op.between]:
            [`${year}-${month}-${day} 05:00:00`, new Date()]
        }}})
      }
      
      //12??? ????????? ??? - ?????? ?????? 5????????? ???????????? ?????? ????????? ??????, ?????? ?????? ?????? 
      if (today.getHours() >= 5) {
        feed = await Feed.findOne({ attributes: ["id"], where: { user_id: userId, 
          create_time: {[Op.between]:
          [`${getYear(new Date())}-${getMonth(new Date())}-${getDay(new Date())} 05:00:00`, new Date()]}}
        });
        userCount = await Feed.count({ where: { 
          create_time: {[Op.between]:
            [`${getYear(new Date())}-${getMonth(new Date())}-${getDay(new Date())} 05:00:00`, new Date()]
        }}})
      }
      
      //?????? ?????? ?????? ??????
      let hasFeed;
      //?????? ?????? ??????
      if (!feed && user.is_completed) {
        hasFeed = 0;
      }
      //?????? ?????? ??????
      else if (feed) {
        hasFeed = 1;
      }
      //?????? ?????? ???
      else if (!user.current_course_id) {
        hasFeed = 2;
      }
      //????????? ?????? ???
      else if (!user.is_completed) {
        hasFeed = 2;
      }
      
      const feedResponse: Array<FeedDTO> = new Array<FeedDTO>();
      const week = new Array("???", "???", "???", "???", "???", "???", "???");

      const blocks = await Block.findAll({ attributes: ["reported_id"], where: { user_id: userId }});
      const blocklist = new Array();
      let feeds;
      if (blocks.length>0) {
        blocks.forEach(block => {
          blocklist.push(block.reported_id);
        })
        feeds = await Feed.findAll({ order: [["id", "DESC"]], where: { user_id: {[Op.notIn]: [blocklist]}, isPrivate: false }});
      }
      else {
        feeds = await Feed.findAll({ order: [["id", "DESC"]], where: { isPrivate: false }});
      }
      
      const emojis = await Emoji.findAll();
      let emojiCount=[0, 0, 0, 0, 0, 0, 0]; //????????? ?????? ?????? ??????, emojiId 1~6, 0?????? ????????? ??????X
      let emojiArray: Array<EmojiDTO> = new Array<EmojiDTO>(); //????????? id??? count ?????? ??????
      let myEmoji = 0; //???????????? ????????? ????????? ????????? ?????????, 0??? ????????? ?????? ?????? ??????
      
      for (let i = 0; i < feeds.length; i++) {
        for (let j = 0; j < emojis.length; j++) {
          if (feeds[i].id == emojis[j].feed_id) { 
            const emojiId = emojis[j].emoji_id; //????????? ?????? ????????? id
            if (emojiCount[emojiId] == 99) {
              emojiCount[emojiId] = 99;
            }
            else {
              emojiCount[emojiId]+=1; //count +1
            }

            if (userId == emojis[j].user_id) { //???????????? ????????? ????????? ???????????? ??????
              myEmoji = +emojiId
            }
          }
        }

        for (let emojiNumber = 1; emojiNumber < 7; emojiNumber++) {
          if (emojiCount[emojiNumber] == 0) { //????????? ?????? 0?????? skip
            continue;
          }
          const emoji: EmojiDTO = {
            id: emojiNumber,
            count: emojiCount[emojiNumber]
          }
          emojiArray.push(emoji);
        }

        //?????? ?????? ??????
        const isReport = (user.nickname!=feeds[i].nickname) ? true : false;
        //?????? ?????? ??????
        const isDelete = (user.nickname==feeds[i].nickname) ? true : false;

        const myFeed: FeedDTO = {
          postId: feeds[i].id,
          course: courses[feeds[i].current_course_id-1].getTitle(), //????????? ????????? -1
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
        //?????? ?????????
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

  community: async(userId: string, page: string) => {
    try{
      const user = await User.findOne({ where: { id: userId }});
      if (!user) {
        return notExistUser;
      }

      let feed;
      let userCount;
      const today = new Date();
      //?????? ??????
      const yesterday = getYesterday(new Date());
      const year = getYear(yesterday);
      const month = getMonth(yesterday);
      const day = getDay(yesterday);

      //12??? ????????? ??? - ?????? ?????? 5????????? ???????????? ?????? ????????? ??????, ?????? ?????? ??????
      if (0 <= today.getHours() && today.getHours() < 5) {
        feed = await Feed.findOne({ attributes: ["id"], where: { user_id: userId, 
          create_time: {[Op.between]:
          [`${year}-${month}-${day} 05:00:00`, new Date()]}}
        });
        userCount = await Feed.count({ where: { 
          create_time: {[Op.between]:
            [`${year}-${month}-${day} 05:00:00`, new Date()]
        }}})
      }

      //12??? ????????? ??? - ?????? ?????? 5????????? ???????????? ?????? ????????? ??????, ?????? ?????? ??????
      if (today.getHours() >= 5) {
        feed = await Feed.findOne({ attributes: ["id"], where: { user_id: userId, 
          create_time: {[Op.between]:
          [`${getYear(new Date())}-${getMonth(new Date())}-${getDay(new Date())} 05:00:00`, new Date()]}}
        });
        userCount = await Feed.count({ where: { 
          create_time: {[Op.between]:
            [`${getYear(new Date())}-${getMonth(new Date())}-${getDay(new Date())} 05:00:00`, new Date()]
        }}})
      }
      
      //?????? ?????? ?????? ??????
      let hasFeed;
      //?????? ?????? ??????
      if (!feed && user.is_completed) {
        hasFeed = 0;
      }
      //?????? ?????? ??????
      else if (feed) {
        hasFeed = 1;
      }
      //?????? ?????? ???
      else if (!user.current_course_id) {
        hasFeed = 2;
      }
      //????????? ?????? ???
      else if (!user.is_completed) {
        hasFeed = 2;
      }
      
      const feedResponse: Array<FeedDTO> = new Array<FeedDTO>();
      const week = new Array("???", "???", "???", "???", "???", "???", "???");

      let feeds;
      const blocks = await Block.findAll({ attributes: ["reported_id"], where: { user_id: userId }});
      const blocklist = new Array();

      if (blocks.length>0) {
        blocks.forEach(block => {
          blocklist.push(block.reported_id);
        })
        feeds = await Feed.findAll({ order: [["create_time", "DESC"]], limit: 15, offset: parseInt(page)*15, where: { user_id: {[Op.notIn]: [blocklist]}, isPrivate: false }});
      }
      else {
        feeds = await Feed.findAll({ order: [["create_time", "DESC"]], limit: 15, offset: parseInt(page)*15, where: { isPrivate: false }});
      }

      const feedId = new Array();
      feeds.forEach(feed => {
        feedId.push(feed.id);
      })
      
      const emojis = await Emoji.findAll({ where: { feed_id: {[Op.or]: [feedId]}} });
      let emojiCount=[0, 0, 0, 0, 0, 0, 0]; //????????? ?????? ?????? ??????, emojiId 1~6, 0?????? ????????? ??????X
      let emojiArray: Array<EmojiDTO> = new Array<EmojiDTO>(); //????????? id??? count ?????? ??????
      let myEmoji = 0; //???????????? ????????? ????????? ????????? ?????????, 0??? ????????? ?????? ?????? ??????
      
      for (let i = 0; i < feeds.length; i++) {
        for (let j = 0; j < emojis.length; j++) {
          if (feeds[i].id == emojis[j].feed_id) { 
            const emojiId = emojis[j].emoji_id; //????????? ?????? ????????? id
            if (emojiCount[emojiId] == 99) {
              emojiCount[emojiId] = 99;
            }
            else {
              emojiCount[emojiId]+=1; //count +1
            }

            if (userId == emojis[j].user_id) { //???????????? ????????? ????????? ???????????? ??????
              myEmoji = +emojiId
            }
          }
        }

        for (let emojiNumber = 1; emojiNumber < 7; emojiNumber++) {
          if (emojiCount[emojiNumber] == 0) { //????????? ?????? 0?????? skip
            continue;
          }
          const emoji: EmojiDTO = {
            id: emojiNumber,
            count: emojiCount[emojiNumber]
          }
          emojiArray.push(emoji);
        }

        //?????? ?????? ??????
        const isReport = (user.nickname!=feeds[i].nickname) ? true : false;
        //?????? ?????? ??????
        const isDelete = (user.nickname==feeds[i].nickname) ? true : false;

        const myFeed: FeedDTO = {
          postId: feeds[i].id,
          course: courses[feeds[i].current_course_id-1].getTitle(), //????????? ????????? -1
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
        //?????? ?????????
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

      const feed = await Feed.findOne({ attributes: ["content", "user_id", "create_time", "image"], where: { id: postId }});
      if (!feed) {
        return notExistFeed;
      }
      
      if (feed.user_id == userId) {
        return invalidReport;
      }

      const reportCount = await Report.count({ where: { post_id: postId }});
      const reportedUser = await User.findOne({ attributes: ["nickname", "feed_count", "report"], where: { id: feed.user_id }});
      if (!reportedUser) {
        return notExistUser;
      }

      sendReport.email(reportedUser.nickname, feed.content);

      if (reportedUser.report == 9) {
        Feed.update({ isPrivate: true }, { where: { user_id: feed.user_id }});
      }
      else {
        User.update({ report: reportedUser.report+1}, { where: { id: feed.user_id }})
      }

      if (reportCount == 2) {
        Feed.destroy({ where: { id: postId }});


        const today = new Date();
        const time = parseInt(feed.create_time.toLocaleTimeString().split(/ |:/)[1]); //?????? ?????? ??????
        const currentTime = today.getHours(); //?????? ??????
  
        let todayFeed;
        let yesterdayFeed;
  
        //?????? ??????
        const yesterday = getYesterday(new Date());
        const year = getYear(yesterday);
        const month = getMonth(yesterday);
        const day = getDay(yesterday);
  
        //?????? ?????? ??? ?????? (????????? ????????? ?????? ????????? ????????? ????????? ??? ??????)
        const preDay1 = getYesterday(feed.create_time);
        const year1 = getYear(preDay1);
        const month1 = getMonth(preDay1);
        const day1 = getDay(preDay1);
  
        //?????? ?????? ????????? ??????
        const preDay2 = getYesterday(feed.create_time);
        const year2 = getYear(preDay2);
        const month2 = getMonth(preDay2);
        const day2 = getDay(preDay2);
  
        //?????? ?????? ?????? ????????????
        const feedDate = getTwoDaysLater(feed.create_time);
  
  
        //??????????????? ????????? ?????? ????????? ???????????? ??????, ?????? ?????? ?????? ?????? ??????
        if (0 <= time && time<5) {
          todayFeed = getYear(feedDate) == getYear(today) && getMonth(feedDate) == getMonth(today) && getDay(feedDate) == getDay(today);
          yesterdayFeed = await Feed.findOne({ attributes: ["id"], where: { user_id: userId, 
            create_time: {[Op.between]:
            [`${year2}-${month2}-${day2} 05:00:00`, `${year1}-${month1}-${day1} 04:59:59`]}}
          });
        }
  
        if (time>=5) {
          if (0 <= currentTime && currentTime<5) {
            todayFeed = getYear(feedDate) == year && getMonth(feedDate) == month && getDay(feedDate) == day;
          }
          if (currentTime >=5) {
            todayFeed = getYear(feedDate) == getYear(today) && getMonth(feedDate) == getMonth(today) && getDay(feedDate) == getDay(today);
          }
          yesterdayFeed = await Feed.findOne({ attributes: ["id"], where: { user_id: userId, 
            create_time: {[Op.between]:
            [`${year1}-${month1}-${day1} 05:00:00`, `${getYear(feedDate)}-${getMonth(feedDate)}-${getDay(feedDate)} 04:59:59`]}}
          });
        }

        //?????? ????????? ?????? ?????? ????????? ????????? ?????? -> ?????? ????????? ??????, ?????? ?????? ?????? ??????
        if (todayFeed && yesterdayFeed) {
          User.update({ is_feed_new: false, feed_count: reportedUser.feed_count-1, feed_success_count: 1 }, { where: { id: feed.user_id }});
        }

        //?????? ????????? ?????? ????????? ????????? ?????? -> ?????? ?????? ?????? ??????
        else if (yesterdayFeed) {
          User.update({ feed_count: reportedUser.feed_count-1, feed_success_count: 1 }, { where: { id: feed.user_id }});
        }

        //?????? ????????? ?????? ????????? ????????? ??????
        else {
          User.update({ feed_count: reportedUser.feed_count-1 }, { where: { id: feed.user_id }});
        }

        const filename = feed.image.split("/")[5];
        s3.deleteObject({
          Bucket: config.awsBucket,
          Key: "images/origin/"+filename
        }, (err) => {
          if (err) { throw err; }
        })
      }

      else {
        Report.create({ user_id: +userId, post_id: +postId });
      }

      const responseDTO: ReportFeedResponseDTO = {
        status: 200,
        message: "????????? ?????????????????????."
      }
      return responseDTO
    }
    
    catch(err) {
      console.error(err);
      return serverError;
    }
  }
}