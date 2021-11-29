"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const upload_1 = require("../modules/upload");
const config_1 = __importDefault(require("../config"));
const sendReport_1 = __importDefault(require("../controller/sendReport"));
const User_1 = require("../models/User");
const Feed_1 = require("../models/Feed");
const Badge_1 = require("../models/Badge");
const Emoji_1 = require("../models/Emoji");
const Report_1 = require("../models/Report");
const Character_1 = require("../models/Character");
const Skin_1 = require("../models/Skin");
const Block_1 = require("../models/Block");
const Level_1 = require("../dummy/Level");
const Course_1 = require("../dummy/Course");
const Skin_2 = require("../dummy/Skin");
const CharacterCard_1 = require("../dummy/CharacterCard");
const mohaengDateFormatter_1 = require("../formatter/mohaengDateFormatter");
const errors_1 = require("../errors");
const sequelize = require("sequelize");
const Op = sequelize.Op;
exports.default = {
    create: async (id, dto, client) => {
        try {
            const { mood, content, image, isPrivate } = dto;
            const user = await User_1.User.findOne({ where: { id: id } });
            if (!user) {
                return errors_1.notExistUser;
            }
            if (!image && !content) {
                return errors_1.notExistFeedContent;
            }
            if (content.length > 40) {
                return errors_1.feedLengthCheck;
            }
            Feed_1.Feed.create({
                user_id: id,
                nickname: user.nickname,
                current_course_id: user.current_course_id,
                current_challenge_id: user.current_challenge_id,
                mood: mood,
                content: content,
                image: image,
                isPrivate: isPrivate
            });
            user.feed_count = user.feed_count + 1;
            //안부 연속 쓰기 성공 여부
            const yesterdayFeed = await Feed_1.Feed.findOne({
                where: { user_id: id,
                    create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getYesterday)(new Date())}`, `${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getYesterday)(new Date())} 23:59:59`] } }
            });
            if (yesterdayFeed) {
                user.feed_success_count = user.feed_success_count + 1;
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
            let totalHappy = Level_1.levels[user.level - 1].getFullHappy();
            if (user.level < 68) {
                if (user.affinity >= totalHappy) {
                    levelUp = true;
                    user.affinity = user.affinity - totalHappy;
                    user.level = ++user.level;
                }
            }
            let levelUpResponse = {};
            //levelUp 했을 때만 아니면 null
            if (levelUp) {
                let cardId = Level_1.levels[user.level - 2].getCardId();
                let image;
                //카드
                if (cardId < 64) {
                    image = CharacterCard_1.characterCards[cardId - 1].getImageURL();
                    const characterType = Math.floor(Number((cardId - 1) / 9)) + 1;
                    Character_1.Character.create({ user_id: +id, character_type: characterType, character_card: cardId });
                }
                //스킨
                else {
                    image = (client == "ios") ? Skin_2.iosSkins[cardId - 64].getImageURL() : Skin_2.aosSkins[cardId - 64].getImageURL();
                    Skin_1.Skin.create({ id: cardId, user_id: +id });
                }
                levelUpResponse = {
                    level: user.level,
                    styleImg: image
                };
                User_1.User.update({ is_style_new: true }, { where: { id: id } });
            }
            let isBadgeNew = false;
            let badgeCount = 0;
            if (user.feed_count == 1) {
                //12: 안부 작성 1개, 첫 안부 작성
                const badge = await Badge_1.Badge.findOne({ where: { id: 12, user_id: id } });
                if (!badge) {
                    isBadgeNew = true;
                    Badge_1.Badge.create({ id: 12, user_id: id });
                    ++badgeCount;
                }
            }
            //13: 안부 작성 15개, 행복한 작성러
            else if (user.feed_count == 15) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 13, user_id: id } });
                if (!badge) {
                    isBadgeNew = true;
                    Badge_1.Badge.create({ id: 13, user_id: id });
                    ++badgeCount;
                }
            }
            //14: 안부 작성 작성 30개, 프로 돌보미
            else if (user.feed_count == 30) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 14, user_id: id } });
                if (!badge) {
                    isBadgeNew = true;
                    Badge_1.Badge.create({ id: 14, user_id: id });
                    ++badgeCount;
                }
            }
            //15: 안부 20일 연속 작성, 꾸주니 꾸주니
            if (user.feed_success_count == 20) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 15, user_id: id } });
                if (!badge) {
                    isBadgeNew = true;
                    Badge_1.Badge.create({ id: 15, user_id: id });
                    ++badgeCount;
                }
            }
            //16: 공개 안부 작성 20개, 킹쉐어
            if (await Feed_1.Feed.count({ where: { user_id: id, isPrivate: false } }) == 19) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 16, user_id: id } });
                if (!badge) {
                    isBadgeNew = true;
                    Badge_1.Badge.create({ id: 16, user_id: id });
                    ++badgeCount;
                }
            }
            ;
            if (isBadgeNew) {
                User_1.User.update({
                    affinity: user.affinity,
                    level: user.level,
                    feed_count: user.feed_count,
                    badge_count: user.badge_count + badgeCount,
                    feed_penalty: false,
                    is_feed_new: true,
                    is_badge_new: isBadgeNew,
                    feed_success_count: user.feed_success_count
                }, {
                    where: { id: id }
                });
            }
            else {
                User_1.User.update({
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
            const feedResponse = {
                happy: happy,
                userHappy: user.affinity,
                totalHappy: totalHappy,
                isPenalty: user.challenge_penalty || user.feed_penalty,
                levelUp: levelUpResponse
            };
            const responseDTO = {
                status: 200,
                data: feedResponse
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
    delete: async (userId, id) => {
        try {
            const user = await User_1.User.findOne({ attributes: ["is_feed_new", "feed_penalty", "feed_count", "feed_success_count"], where: { id: userId } });
            if (!user) {
                return errors_1.notExistUser;
            }
            const feed = await Feed_1.Feed.findOne({ attributes: ["id", "user_id", "image", "create_time"], where: { id: id } });
            if (!feed) {
                return errors_1.notExistFeed;
            }
            const todayFeed = `${(0, mohaengDateFormatter_1.getYear)(feed.create_time)}` == `${(0, mohaengDateFormatter_1.getYear)(new Date())}` && `${(0, mohaengDateFormatter_1.getMonth)(feed.create_time)}` == `${(0, mohaengDateFormatter_1.getMonth)(new Date())}` && `${(0, mohaengDateFormatter_1.getDay)(feed.create_time)}` == `${(0, mohaengDateFormatter_1.getDay)(new Date())}`;
            const yesterdayFeed = await Feed_1.Feed.findOne({
                attributes: ["id"],
                where: { user_id: userId,
                    create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(feed.create_time)}-${(0, mohaengDateFormatter_1.getMonth)(feed.create_time)}-${(0, mohaengDateFormatter_1.getYesterday)(feed.create_time)}`, `${(0, mohaengDateFormatter_1.getYear)(feed.create_time)}-${(0, mohaengDateFormatter_1.getMonth)(feed.create_time)}-${(0, mohaengDateFormatter_1.getYesterday)(feed.create_time)} 23:59:59`] } }
            });
            //전날 피드가 있고 오늘 작성한 피드를 삭제할 경우 -> 피드 패널티, 연속 피드 작성 실패
            if (userId == feed.user_id && todayFeed && yesterdayFeed) {
                User_1.User.update({ is_feed_new: false, feed_count: user.feed_count - 1, feed_penalty: true, feed_success_count: 1 }, { where: { id: userId } });
                Feed_1.Feed.destroy({ where: { id: id } });
            }
            //전날 피드가 없고 오늘 작성한 피드를 삭제할 경우 -> 피드 패널티
            else if (userId == feed.user_id && todayFeed) {
                User_1.User.update({ is_feed_new: false, feed_count: user.feed_count - 1, feed_penalty: true }, { where: { id: userId } });
                Feed_1.Feed.destroy({ where: { id: id } });
            }
            //전날 피드가 있고 오늘 이전의 피드를 삭제할 경우 -> 피드 연속 작성 실패
            else if (userId == feed.user_id && yesterdayFeed) {
                User_1.User.update({ feed_count: user.feed_count - 1, feed_success_count: 1 }, { where: { id: userId } });
                Feed_1.Feed.destroy({ where: { id: id } });
            }
            //오늘 이전의 피드를 삭제할 경우
            else if (userId = feed.user_id) {
                User_1.User.update({ feed_count: user.feed_count - 1 }, { where: { id: userId } });
                Feed_1.Feed.destroy({ where: { id: id } });
            }
            else {
                return errors_1.notAuthorized;
            }
            const filename = feed.image.split("/")[5];
            upload_1.s3.deleteObject({
                Bucket: config_1.default.awsBucket,
                Key: "images/origin/" + filename
            }, (err) => {
                if (err) {
                    throw err;
                }
            });
            const responseDTO = {
                status: 200,
                message: "피드를 삭제했습니다."
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
    emoji: async (userId, feedId, dto) => {
        try {
            const user = await User_1.User.findOne({ where: { id: userId } });
            if (!user) {
                return errors_1.notExistUser;
            }
            //잘못된 이모지 번호
            const { emojiId } = dto;
            const emojiNumber = +emojiId;
            if (emojiNumber == 0 || emojiNumber > 6) {
                return errors_1.wrongEmojiId;
            }
            //이미 이모지가 있는 경우
            const emojiExist = await Emoji_1.Emoji.findOne({ where: { emoji_id: emojiId, user_id: userId, feed_id: feedId } });
            if (emojiExist) {
                return errors_1.alreadyExsitEmoji;
            }
            const feed = await Feed_1.Feed.findOne({ attributes: ["id", "user_id"], where: { id: feedId } });
            if (!feed) {
                return errors_1.notExistFeed;
            }
            const emoji = await Emoji_1.Emoji.findOne({ where: { user_id: userId, feed_id: feedId } });
            if (emoji) {
                await Emoji_1.Emoji.update({ emoji_id: emojiId }, { where: { user_id: userId, feed_id: feedId } });
            }
            else {
                await Emoji_1.Emoji.create({ emoji_id: emojiId, user_id: userId, feed_id: feedId });
            }
            //17: 스티커 붙이기 5개, 관심의 시작
            let isBadgeNew = false;
            let badgeCount = 0;
            const emojiCount = await Emoji_1.Emoji.count({ where: { user_id: userId } });
            if (emojiCount == 5) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 17, user_id: userId } });
                if (!badge) {
                    isBadgeNew = true;
                    Badge_1.Badge.create({ id: 17, user_id: userId });
                    ++badgeCount;
                }
            }
            //18: 스티커 붙이기 30개, 관심 전달자
            else if (emojiCount == 30) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 18, user_id: userId } });
                if (!badge) {
                    isBadgeNew = true;
                    Badge_1.Badge.create({ id: 18, user_id: userId });
                    ++badgeCount;
                }
            }
            //19: 스티커 붙이기 60개, 모행의 마당발
            else if (emojiCount == 60) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 19, user_id: userId } });
                if (!badge) {
                    isBadgeNew = true;
                    Badge_1.Badge.create({ id: 19, user_id: userId });
                    ++badgeCount;
                }
            }
            if (isBadgeNew) {
                User_1.User.update({ is_badge_new: true, badge_count: user.badge_count + badgeCount }, { where: { id: userId } });
            }
            // 이모지 붙인 것이 자기자신이 아닐 경우 푸시알림 전송
            if (Number(feed.user_id) != Number(user.id)) {
                axios_1.default.request({
                    method: 'GET',
                    url: process.env.PUSH_URL,
                    headers: {
                        'feed-user-id': feed.user_id
                    }
                });
            }
            const requestDTO = {
                status: 200,
                message: "이모지를 추가하였습니다."
            };
            return requestDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
    deleteEmoji: async (userId, feedId, dto) => {
        try {
            const user = await User_1.User.findOne({ where: { id: userId } });
            if (!user) {
                return errors_1.notExistUser;
            }
            const { emojiId } = dto;
            const emoji = await Emoji_1.Emoji.findOne({ where: { emoji_id: emojiId, user_id: userId, feed_id: feedId } });
            if (emoji) {
                Emoji_1.Emoji.destroy({ where: { emoji_id: emojiId, user_id: userId, feed_id: feedId } });
            }
            else {
                return errors_1.notExistEmoji;
            }
            const responseDTO = {
                status: 200,
                message: "이모지를 삭제했습니다."
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
    myFeed: async (userId, year, month) => {
        try {
            const user = await User_1.User.findOne({ attributes: ["current_challenge_id"], where: { id: userId } });
            if (!user) {
                return errors_1.notExistUser;
            }
            await User_1.User.update({ is_feed_new: false }, { where: { id: userId } });
            const feedResponse = new Array();
            const yearNumber = +year;
            const monthNumber = +month;
            const week = new Array("일", "월", "화", "수", "목", "금", "토");
            //한 달 동안 쓴 피드 모두 가져오기
            const myFeeds = await Feed_1.Feed.findAll({
                order: [["id", "DESC"]],
                where: { user_id: userId,
                    create_time: { [Op.between]: [`${year}-${month}`, `${year}-${month}-${(0, mohaengDateFormatter_1.getDay)(new Date(yearNumber, monthNumber, 0))} 23:59:59`] //달의 마지막날 구하기
                    } }
            });
            const emojis = await Emoji_1.Emoji.findAll();
            let emojiCount = [0, 0, 0, 0, 0, 0, 0]; //피드에 있는 이모지 개수 넣는 배열, emojiId 1~6, 0번째 요소는 사용X
            let emojiArray = new Array(); //이모지 id랑 count 넣는 배열
            let myEmoji = 0; //조회하는 유저가 피드에 추가한 이모지, 0은 이모지 추가 안한 경우
            for (let i = 0; i < myFeeds.length; i++) {
                for (let j = 0; j < emojis.length; j++) {
                    if (myFeeds[i].id == emojis[j].feed_id) {
                        const emojiId = emojis[j].emoji_id; //피드에 붙는 이모지 id
                        if (emojiCount[emojiId] == 99) {
                            emojiCount[emojiId] = 99;
                        }
                        else {
                            emojiCount[emojiId] += 1; //count +1
                        }
                        if (userId == emojis[j].user_id) { //사용자가 피드에 이모지 붙였는지 여부
                            myEmoji = +emojiId;
                        }
                    }
                }
                for (let emojiNumber = 1; emojiNumber < 7; emojiNumber++) {
                    if (emojiCount[emojiNumber] == 0) { //이모지 개수 0개면 skip
                        continue;
                    }
                    const emoji = {
                        id: emojiNumber,
                        count: emojiCount[emojiNumber]
                    };
                    emojiArray.push(emoji);
                }
                const myFeed = {
                    postId: myFeeds[i].id,
                    course: Course_1.courses[myFeeds[i].current_course_id - 1].getTitle(),
                    challenge: myFeeds[i].current_challenge_id,
                    image: myFeeds[i].image,
                    mood: myFeeds[i].mood,
                    content: myFeeds[i].content,
                    nickname: myFeeds[i].nickname,
                    year: (0, mohaengDateFormatter_1.getYear)(myFeeds[i].create_time),
                    month: (0, mohaengDateFormatter_1.getMonth)(myFeeds[i].create_time),
                    date: (0, mohaengDateFormatter_1.getDay)(myFeeds[i].create_time),
                    day: week[myFeeds[i].create_time.getDay()],
                    emoji: emojiArray,
                    myEmoji: myEmoji,
                    isReport: false,
                    isDelete: true
                };
                feedResponse.push(myFeed);
                //배열 초기화
                emojiArray = [];
                emojiCount = [0, 0, 0, 0, 0, 0, 0];
            }
            const myFeedDTO = {
                feeds: feedResponse
            };
            const responseDTO = {
                status: 200,
                data: myFeedDTO
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
    feed: async (userId) => {
        try {
            const user = await User_1.User.findOne({ where: { id: userId } });
            if (!user) {
                return errors_1.notExistUser;
            }
            let feed;
            let userCount;
            const today = new Date();
            //12시 지났을 때 - 어제 새벽 5시부터 지금까지 피드 있는지 확인, 안부 개수 세기
            if (0 <= today.getHours() && today.getHours() < 5) {
                feed = await Feed_1.Feed.findOne({ attributes: ["id"], where: { user_id: userId,
                        create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getYesterday)(new Date())} 05:00:00`, new Date()] } }
                });
                userCount = await Feed_1.Feed.count({ where: {
                        create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getYesterday)(new Date())} 05:00:00`, new Date()]
                        }
                    } });
            }
            //12시 이전일 때 - 오늘 새벽 5시부터 지금까지 피드 있는지 확인, 안부 개수 세기 
            if (today.getHours() >= 5) {
                feed = await Feed_1.Feed.findOne({ attributes: ["id"], where: { user_id: userId,
                        create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getDay)(new Date())} 05:00:00`, new Date()] } }
                });
                userCount = await Feed_1.Feed.count({ where: {
                        create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getDay)(new Date())} 05:00:00`, new Date()]
                        }
                    } });
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
            const feedResponse = new Array();
            const week = new Array("일", "월", "화", "수", "목", "금", "토");
            const blocks = await Block_1.Block.findAll({ attributes: ["reported_id"], where: { user_id: userId } });
            const blocklist = new Array();
            let feeds;
            if (blocks.length > 0) {
                blocks.forEach(block => {
                    blocklist.push(block.reported_id);
                });
                feeds = await Feed_1.Feed.findAll({ order: [["id", "DESC"]], where: { user_id: { [Op.notIn]: [blocklist] }, isPrivate: false } });
            }
            else {
                feeds = await Feed_1.Feed.findAll({ order: [["id", "DESC"]], where: { isPrivate: false } });
            }
            const emojis = await Emoji_1.Emoji.findAll();
            let emojiCount = [0, 0, 0, 0, 0, 0, 0]; //이모지 개수 넣는 배열, emojiId 1~6, 0번째 요소는 사용X
            let emojiArray = new Array(); //이모지 id랑 count 넣는 배열
            let myEmoji = 0; //조회하는 유저가 피드에 추가한 이모지, 0은 이모지 추가 안한 경우
            for (let i = 0; i < feeds.length; i++) {
                for (let j = 0; j < emojis.length; j++) {
                    if (feeds[i].id == emojis[j].feed_id) {
                        const emojiId = emojis[j].emoji_id; //피드에 붙는 이모지 id
                        if (emojiCount[emojiId] == 99) {
                            emojiCount[emojiId] = 99;
                        }
                        else {
                            emojiCount[emojiId] += 1; //count +1
                        }
                        if (userId == emojis[j].user_id) { //사용자가 피드에 이모지 붙였는지 여부
                            myEmoji = +emojiId;
                        }
                    }
                }
                for (let emojiNumber = 1; emojiNumber < 7; emojiNumber++) {
                    if (emojiCount[emojiNumber] == 0) { //이모지 개수 0개면 skip
                        continue;
                    }
                    const emoji = {
                        id: emojiNumber,
                        count: emojiCount[emojiNumber]
                    };
                    emojiArray.push(emoji);
                }
                //신고 가능 여부
                const isReport = (user.nickname != feeds[i].nickname) ? true : false;
                //삭제 가능 여부
                const isDelete = (user.nickname == feeds[i].nickname) ? true : false;
                const myFeed = {
                    postId: feeds[i].id,
                    course: Course_1.courses[feeds[i].current_course_id - 1].getTitle(),
                    challenge: feeds[i].current_challenge_id,
                    image: feeds[i].image,
                    mood: feeds[i].mood,
                    content: feeds[i].content,
                    nickname: feeds[i].nickname,
                    year: (0, mohaengDateFormatter_1.getYear)(feeds[i].create_time),
                    month: (0, mohaengDateFormatter_1.getMonth)(feeds[i].create_time),
                    date: (0, mohaengDateFormatter_1.getDay)(feeds[i].create_time),
                    day: week[feeds[i].create_time.getDay()],
                    emoji: emojiArray,
                    myEmoji: myEmoji,
                    isReport: isReport,
                    isDelete: isDelete
                };
                feedResponse.push(myFeed);
                //배열 초기화
                emojiArray = [];
                emojiCount = [0, 0, 0, 0, 0, 0, 0];
            }
            const community = {
                isNew: user.is_feed_new,
                hasFeed: hasFeed,
                userCount: userCount,
                feeds: feedResponse
            };
            const responseDTO = {
                status: 200,
                data: community
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
    community: async (userId, page) => {
        try {
            const user = await User_1.User.findOne({ where: { id: userId } });
            if (!user) {
                return errors_1.notExistUser;
            }
            let feed;
            let userCount;
            const today = new Date();
            //12시 지났을 때 - 어제 새벽 5시부터 지금까지 피드 있는지 확인, 안부 개수 세기
            if (0 <= today.getHours() && today.getHours() < 5) {
                feed = await Feed_1.Feed.findOne({ attributes: ["id"], where: { user_id: userId,
                        create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getYesterday)(new Date())} 05:00:00`, new Date()] } }
                });
                userCount = await Feed_1.Feed.count({ where: {
                        create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getYesterday)(new Date())} 05:00:00`, new Date()]
                        }
                    } });
            }
            //12시 이전일 때 - 오늘 새벽 5시부터 지금까지 피드 있는지 확인, 안부 개수 세기
            if (today.getHours() >= 5) {
                feed = await Feed_1.Feed.findOne({ attributes: ["id"], where: { user_id: userId,
                        create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getDay)(new Date())} 05:00:00`, new Date()] } }
                });
                userCount = await Feed_1.Feed.count({ where: {
                        create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getDay)(new Date())} 05:00:00`, new Date()]
                        }
                    } });
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
            const feedResponse = new Array();
            const week = new Array("일", "월", "화", "수", "목", "금", "토");
            const blocks = await Block_1.Block.findAll({ attributes: ["reported_id"], where: { user_id: userId } });
            const blocklist = new Array();
            let feeds;
            if (blocks.length > 0) {
                blocks.forEach(block => {
                    blocklist.push(block.reported_id);
                });
                feeds = await Feed_1.Feed.findAll({ order: [["id", "DESC"]], limit: 15, offset: +page * 15, where: { user_id: { [Op.notIn]: [blocklist] }, isPrivate: false } });
            }
            else {
                feeds = await Feed_1.Feed.findAll({ order: [["id", "DESC"]], limit: 15, offset: +page * 15, where: { isPrivate: false } });
            }
            const feedId = new Array();
            feeds.forEach(feed => {
                feedId.push(feed.id);
            });
            const emojis = await Emoji_1.Emoji.findAll({ where: { feed_id: { [Op.or]: [feedId] } } });
            let emojiCount = [0, 0, 0, 0, 0, 0, 0]; //이모지 개수 넣는 배열, emojiId 1~6, 0번째 요소는 사용X
            let emojiArray = new Array(); //이모지 id랑 count 넣는 배열
            let myEmoji = 0; //조회하는 유저가 피드에 추가한 이모지, 0은 이모지 추가 안한 경우
            for (let i = 0; i < feeds.length; i++) {
                for (let j = 0; j < emojis.length; j++) {
                    if (feeds[i].id == emojis[j].feed_id) {
                        const emojiId = emojis[j].emoji_id; //피드에 붙는 이모지 id
                        if (emojiCount[emojiId] == 99) {
                            emojiCount[emojiId] = 99;
                        }
                        else {
                            emojiCount[emojiId] += 1; //count +1
                        }
                        if (userId == emojis[j].user_id) { //사용자가 피드에 이모지 붙였는지 여부
                            myEmoji = +emojiId;
                        }
                    }
                }
                for (let emojiNumber = 1; emojiNumber < 7; emojiNumber++) {
                    if (emojiCount[emojiNumber] == 0) { //이모지 개수 0개면 skip
                        continue;
                    }
                    const emoji = {
                        id: emojiNumber,
                        count: emojiCount[emojiNumber]
                    };
                    emojiArray.push(emoji);
                }
                //신고 가능 여부
                const isReport = (user.nickname != feeds[i].nickname) ? true : false;
                //삭제 가능 여부
                const isDelete = (user.nickname == feeds[i].nickname) ? true : false;
                const myFeed = {
                    postId: feeds[i].id,
                    course: Course_1.courses[feeds[i].current_course_id - 1].getTitle(),
                    challenge: feeds[i].current_challenge_id,
                    image: feeds[i].image,
                    mood: feeds[i].mood,
                    content: feeds[i].content,
                    nickname: feeds[i].nickname,
                    year: (0, mohaengDateFormatter_1.getYear)(feeds[i].create_time),
                    month: (0, mohaengDateFormatter_1.getMonth)(feeds[i].create_time),
                    date: (0, mohaengDateFormatter_1.getDay)(feeds[i].create_time),
                    day: week[feeds[i].create_time.getDay()],
                    emoji: emojiArray,
                    myEmoji: myEmoji,
                    isReport: isReport,
                    isDelete: isDelete
                };
                feedResponse.push(myFeed);
                //배열 초기화
                emojiArray = [];
                emojiCount = [0, 0, 0, 0, 0, 0, 0];
            }
            const community = {
                isNew: user.is_feed_new,
                hasFeed: hasFeed,
                userCount: userCount,
                feeds: feedResponse
            };
            const responseDTO = {
                status: 200,
                data: community
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
    report: async (userId, postId) => {
        try {
            const user = await User_1.User.findOne({ attributes: ["id"], where: { id: userId } });
            if (!user) {
                return errors_1.notExistUser;
            }
            const report = await Report_1.Report.findOne({ where: { user_id: userId, post_id: postId } });
            if (report) {
                return errors_1.alreadyReported;
            }
            const feed = await Feed_1.Feed.findOne({ attributes: ["content", "user_id", "create_time"], where: { id: postId } });
            if (!feed) {
                return errors_1.notExistFeed;
            }
            if (feed.user_id == userId) {
                return errors_1.invalidReport;
            }
            const reportCount = await Report_1.Report.count({ where: { post_id: postId } });
            const reportedUser = await User_1.User.findOne({ attributes: ["nickname", "feed_count", "report"], where: { id: feed.user_id } });
            if (!reportedUser) {
                return errors_1.notExistUser;
            }
            sendReport_1.default.email(reportedUser.nickname, feed.content);
            if (reportedUser.report == 9) {
                User_1.User.destroy({ where: { id: feed.user_id } });
            }
            else {
                User_1.User.update({ report: reportedUser.report + 1 }, { where: { id: feed.user_id } });
            }
            if (reportCount == 2) {
                Feed_1.Feed.destroy({ where: { id: postId } });
                const todayFeed = `${(0, mohaengDateFormatter_1.getYear)(feed.create_time)}` == `${(0, mohaengDateFormatter_1.getYear)(new Date())}` && `${(0, mohaengDateFormatter_1.getMonth)(feed.create_time)}` == `${(0, mohaengDateFormatter_1.getMonth)(new Date())}` && `${(0, mohaengDateFormatter_1.getDay)(feed.create_time)}` == `${(0, mohaengDateFormatter_1.getDay)(new Date())}`;
                const yesterdayFeed = await Feed_1.Feed.findOne({
                    attributes: ["id"],
                    where: { user_id: feed.user_id,
                        create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(feed.create_time)}-${(0, mohaengDateFormatter_1.getMonth)(feed.create_time)}-${(0, mohaengDateFormatter_1.getYesterday)(feed.create_time)}`, `${(0, mohaengDateFormatter_1.getYear)(feed.create_time)}-${(0, mohaengDateFormatter_1.getMonth)(feed.create_time)}-${(0, mohaengDateFormatter_1.getYesterday)(feed.create_time)} 23:59:59`] } }
                });
                //전날 피드가 있는 오늘 피드가 삭제될 경우 -> 피드 재작성 가능, 연속 피드 작성 실패
                if (todayFeed && yesterdayFeed) {
                    User_1.User.update({ is_feed_new: false, feed_count: reportedUser.feed_count - 1, feed_success_count: 1 }, { where: { id: feed.user_id } });
                }
                //전날 피드가 있는 피드가 삭제될 경우 -> 연속 피드 작성 실패
                else if (yesterdayFeed) {
                    User_1.User.update({ feed_count: reportedUser.feed_count - 1, feed_success_count: 1 }, { where: { id: feed.user_id } });
                }
                //전날 피드가 없는 피드가 삭제될 경우
                else {
                    User_1.User.update({ feed_count: reportedUser.feed_count - 1 }, { where: { id: feed.user_id } });
                }
            }
            else {
                Report_1.Report.create({ user_id: +userId, post_id: +postId });
            }
            const responseDTO = {
                status: 200,
                message: "안부를 신고하였습니다."
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    }
};
//# sourceMappingURL=feedService.js.map