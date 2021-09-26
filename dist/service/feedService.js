"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Feed_1 = require("../models/Feed");
const Badge_1 = require("../models/Badge");
const Emoji_1 = require("../models/Emoji");
const Level_1 = require("../dummy/Level");
const Course_1 = require("../dummy/Course");
const mohaengDateFormatter_1 = require("../formatter/mohaengDateFormatter");
const errors_1 = require("../errors");
const sequelize = require("sequelize");
const Op = sequelize.Op;
exports.default = {
    create: async (id, dto) => {
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
            await Feed_1.Feed.create({
                user_id: id,
                nickname: user.nickname,
                current_course_id: user.current_course_id,
                current_challenge_id: user.current_course_id,
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
                user.feed_success_count = 0;
            }
            //user 패널티 여부
            let happy;
            if (user.feed_penalty) {
                happy = 0;
            }
            else {
                happy = 15;
            }
            user.affinity = user.affinity + happy;
            //level의 happy지수보다 user의 해피지수가 높다면 levelup
            let levelUp = false;
            let totalHappy = Level_1.levels[user.level - 1].getFullHappy();
            if (user.affinity >= totalHappy) {
                levelUp = true;
                user.affinity = user.affinity - totalHappy;
                user.level = ++user.level;
            }
            let levelUpResponse;
            if (levelUp) {
                //캐릭터카드 확정 후 수정 예정
                const characterCards = new Array();
                characterCards.forEach((characterCard) => {
                    const characterCardResponse = {
                        id: 1,
                        image: "imageUrl"
                    };
                    characterCards.push(characterCardResponse);
                });
                //levelUp 했을 때만 아니면 null
                levelUpResponse = {
                    level: user.level,
                    characterType: 1,
                    characterCard: characterCards
                };
            }
            //12: 안부 작성 1개, 첫 안부 작성
            let isBadgeNew = false;
            if (user.feed_count == 1) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 12, user_id: id } });
                if (!badge) {
                    isBadgeNew = true;
                    await Badge_1.Badge.create({
                        id: 12,
                        user_id: id
                    });
                }
            }
            //13: 안부 작성 15개, 행복한 작성러
            else if (user.feed_count == 15) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 13, user_id: id } });
                if (!badge) {
                    isBadgeNew = true;
                    await Badge_1.Badge.create({
                        id: 13,
                        user_id: id
                    });
                }
            }
            //14: 안부 작성 작성 30개, 프로 돌보미
            else if (user.feed_count == 30) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 14, user_id: id } });
                if (!badge) {
                    isBadgeNew = true;
                    await Badge_1.Badge.create({
                        id: 14,
                        user_id: id
                    });
                }
            }
            //15: 안부 20일 연속 작성, 꾸주니 꾸주니
            if (user.feed_success_count == 20) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 15, user_id: id } });
                if (!badge) {
                    isBadgeNew = true;
                    await Badge_1.Badge.create({
                        id: 15,
                        user_id: id
                    });
                }
            }
            //16: 공개 안부 작성 20개, 킹쉐어
            if (await Feed_1.Feed.count({ where: { user_id: id, isPrivate: false } }) == 19) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 16, user_id: id } });
                if (!badge) {
                    isBadgeNew = true;
                    await Badge_1.Badge.create({
                        id: 16,
                        user_id: id
                    });
                }
            }
            ;
            if (isBadgeNew) {
                await User_1.User.update({
                    affinity: user.affinity,
                    level: user.level,
                    feed_count: user.feed_count,
                    badge_count: user.badge_count + 1,
                    feed_penalty: false,
                    is_feed_new: true,
                    is_badge_new: isBadgeNew,
                    feed_success_count: user.feed_success_count
                }, {
                    where: { id: id }
                });
            }
            else {
                await User_1.User.update({
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
            const feed = await Feed_1.Feed.findOne({ attributes: ["id", "user_id", "create_time"], where: { id: id } });
            if (!feed) {
                return errors_1.notExsitFeed;
            }
            const todayFeed = `${(0, mohaengDateFormatter_1.getYear)(feed.create_time)}` == `${(0, mohaengDateFormatter_1.getYear)(new Date())}` && `${(0, mohaengDateFormatter_1.getMonth)(feed.create_time)}` == `${(0, mohaengDateFormatter_1.getMonth)(new Date())}` && `${(0, mohaengDateFormatter_1.getDay)(feed.create_time)}` == `${(0, mohaengDateFormatter_1.getDay)(new Date())}`;
            const yesterdayFeed = await Feed_1.Feed.findOne({
                attributes: ["id"],
                where: { user_id: userId,
                    create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(feed.create_time)}-${(0, mohaengDateFormatter_1.getMonth)(feed.create_time)}-${(0, mohaengDateFormatter_1.getYesterday)(feed.create_time)}`, `${(0, mohaengDateFormatter_1.getYear)(feed.create_time)}-${(0, mohaengDateFormatter_1.getMonth)(feed.create_time)}-${(0, mohaengDateFormatter_1.getYesterday)(feed.create_time)} 23:59:59`] } }
            });
            //전날 피드가 있고 오늘 작성한 피드를 삭제할 경우 -> 피드 패널티, 연속 피드 작성 실패
            if (userId == feed.user_id && todayFeed && yesterdayFeed) {
                console.log(user.feed_count);
                await User_1.User.update({ is_feed_new: false, feed_count: user.feed_count - 1, feed_penalty: true, feed_success_count: 0 }, { where: { id: userId } });
                await Feed_1.Feed.destroy({ where: { id: id } });
            }
            //전날 피드가 없고 오늘 작성한 피드를 삭제할 경우 -> 피드 패널티
            else if (userId == feed.user_id && todayFeed) {
                await User_1.User.update({ is_feed_new: false, feed_count: user.feed_count - 1, feed_penalty: true }, { where: { id: userId } });
                await Feed_1.Feed.destroy({ where: { id: id } });
            }
            //전날 피드가 있고 오늘 이전의 피드를 삭제할 경우 -> 피드 연속 작성 실패
            else if (userId == feed.user_id && yesterdayFeed) {
                await User_1.User.update({ feed_count: user.feed_count - 1, feed_success_count: 0 }, { where: { id: userId } });
                await Feed_1.Feed.destroy({ where: { id: id } });
            }
            //오늘 이전의 피드를 삭제할 경우
            else if (userId = feed.user_id) {
                await User_1.User.update({ feed_count: user.feed_count - 1 }, { where: { id: userId } });
                await Feed_1.Feed.destroy({ where: { id: id } });
            }
            else {
                return errors_1.notAuthorized;
            }
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
            const emoji = await Emoji_1.Emoji.findOne({ where: { user_id: userId, feed_id: feedId } });
            if (emoji) {
                await Emoji_1.Emoji.update({ emoji_id: emojiId }, { where: { user_id: userId, feed_id: feedId } });
            }
            else {
                await Emoji_1.Emoji.create({ emoji_id: emojiId, user_id: userId, feed_id: feedId });
            }
            //17: 스티커 붙이기 5개, 관심의 시작
            let isBadgeNew = false;
            const emojiCount = await Emoji_1.Emoji.count({ where: { user_id: userId } });
            if (emojiCount == 5) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 17, user_id: userId } });
                if (!badge) {
                    isBadgeNew = true;
                    await Badge_1.Badge.create({
                        id: 17,
                        user_id: userId
                    });
                }
            }
            //18: 스티커 붙이기 30개, 관심 전달자
            else if (emojiCount == 30) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 18, user_id: userId } });
                if (!badge) {
                    isBadgeNew = true;
                    await Badge_1.Badge.create({
                        id: 18,
                        user_id: userId
                    });
                }
            }
            //19: 스티커 붙이기 60개, 모행의 마당발
            else if (emojiCount == 60) {
                const badge = await Badge_1.Badge.findOne({ where: { id: 19, user_id: userId } });
                if (!badge) {
                    isBadgeNew = true;
                    await Badge_1.Badge.create({
                        id: 19,
                        user_id: userId
                    });
                }
            }
            if (isBadgeNew) {
                User_1.User.update({ is_badge_new: true }, { where: { id: userId } });
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
                await Emoji_1.Emoji.destroy({ where: { emoji_id: emojiId, user_id: userId, feed_id: feedId } });
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
            const user = await User_1.User.findOne({ where: { id: userId } });
            if (!user) {
                return errors_1.notExistUser;
            }
            const feedResponse = new Array();
            const yearNumber = +year;
            const monthNumber = +month;
            const week = new Array("일", "월", "화", "수", "목", "금", "토");
            //한 달 동안 쓴 피드 모두 가져오기
            const myFeeds = await Feed_1.Feed.findAll({
                where: { user_id: userId,
                    create_time: { [Op.between]: [`${year}-${month}`, `${year}-${month}-${(0, mohaengDateFormatter_1.getDay)(new Date(yearNumber, monthNumber, 0))} 23:59:59`] //달의 마지막날 구하기
                    } }
            });
            for (let i = 0; i < myFeeds.length; i++) {
                const emojiArray = new Array();
                const emojis = await Emoji_1.Emoji.findAll({ where: { feed_id: myFeeds[i].id } });
                //각 피드마다 이모지의 종류와 그 개수
                for (let emojiNumber = 1; emojiNumber < 7; emojiNumber++) {
                    const newEmojiArray = emojis.filter(emoji => emoji.emoji_id == `${emojiNumber}`);
                    //이모지 개수 0개일 경우 생략
                    if (newEmojiArray.length == 0) {
                        continue;
                    }
                    //이모지 최대 개수 99개 제한
                    if (newEmojiArray.length >= 99) {
                        newEmojiArray.length = 99;
                    }
                    emojiArray.push({ id: emojiNumber.toString(), count: newEmojiArray.length });
                }
                //사용자가 피드에 이모지를 추가했는지 여부
                let myEmoji = await Emoji_1.Emoji.findOne({ attributes: ["emoji_id"], where: { user_id: userId, feed_id: myFeeds[i].id } });
                let userEmoji;
                if (!myEmoji) {
                    userEmoji = "0";
                }
                else {
                    userEmoji = myEmoji.emoji_id;
                }
                const myFeed = {
                    postId: myFeeds[i].id,
                    course: Course_1.courses[myFeeds[i].current_course_id - 1].getTitle(),
                    challenge: user.current_challenge_id,
                    image: myFeeds[i].image,
                    mood: myFeeds[i].mood,
                    content: myFeeds[i].content,
                    nickname: myFeeds[i].nickname,
                    year: (0, mohaengDateFormatter_1.getYear)(myFeeds[i].create_time),
                    month: (0, mohaengDateFormatter_1.getMonth)(myFeeds[i].create_time),
                    date: (0, mohaengDateFormatter_1.getDay)(myFeeds[i].create_time),
                    day: week[myFeeds[i].create_time.getDay()],
                    emoji: emojiArray,
                    myEmoji: userEmoji,
                    isReport: false,
                    isDelete: true
                };
                feedResponse.push(myFeed);
            }
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
    feed: async (userId) => {
        try {
            const user = await User_1.User.findOne({ where: { id: userId } });
            if (!user) {
                return errors_1.notExistUser;
            }
            //안부 작성 가능 여부
            let hasFeed;
            //피드 작성 가능
            if (!user.is_feed_new && user.is_completed) {
                hasFeed = 0;
            }
            //피드 이미 작성
            else if (user.is_feed_new) {
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
            const userCount = await Feed_1.Feed.count({
                where: { create_time: { [Op.between]: [`${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getDay)(new Date())}`, `${(0, mohaengDateFormatter_1.getYear)(new Date())}-${(0, mohaengDateFormatter_1.getMonth)(new Date())}-${(0, mohaengDateFormatter_1.getDay)(new Date())} 23:59:59`]
                    } }
            });
            const feedResponse = new Array();
            const week = new Array("일", "월", "화", "수", "목", "금", "토");
            //피드 모두 가져오기
            const feeds = await Feed_1.Feed.findAll({ order: [["id", "DESC"]] });
            for (let i = 0; i < feeds.length; i++) {
                const emojiArray = new Array();
                const emojis = await Emoji_1.Emoji.findAll({ where: { feed_id: feeds[i].id } });
                //각 피드마다 이모지의 종류와 그 개수
                for (let emojiNumber = 1; emojiNumber < 7; emojiNumber++) {
                    const newEmojiArray = emojis.filter(emoji => emoji.emoji_id == `${emojiNumber}`);
                    //이모지 개수 0개일 경우 생략
                    if (newEmojiArray.length == 0) {
                        continue;
                    }
                    //이모지 최대 개수 99개 제한
                    if (newEmojiArray.length >= 99) {
                        newEmojiArray.length = 99;
                    }
                    emojiArray.push({ id: emojiNumber.toString(), count: newEmojiArray.length });
                }
                //사용자가 피드에 이모지를 추가했는지 여부
                let myEmoji = await Emoji_1.Emoji.findOne({ attributes: ["emoji_id"], where: { user_id: userId, feed_id: feeds[i].id } });
                let userEmoji;
                if (!myEmoji) {
                    userEmoji = "0";
                }
                else {
                    userEmoji = myEmoji.emoji_id;
                }
                //신고 가능 여부
                let isReport;
                if (user.nickname != feeds[i].nickname) {
                    isReport = true;
                }
                else {
                    isReport = false;
                }
                //삭제 가능 여부
                let isDelete;
                if (user.nickname == feeds[i].nickname) {
                    isDelete = true;
                }
                else {
                    isDelete = false;
                }
                const myFeed = {
                    postId: feeds[i].id,
                    course: Course_1.courses[feeds[i].current_course_id - 1].getTitle(),
                    challenge: user.current_challenge_id,
                    image: feeds[i].image,
                    mood: feeds[i].mood,
                    content: feeds[i].content,
                    nickname: feeds[i].nickname,
                    year: (0, mohaengDateFormatter_1.getYear)(feeds[i].create_time),
                    month: (0, mohaengDateFormatter_1.getMonth)(feeds[i].create_time),
                    date: (0, mohaengDateFormatter_1.getDay)(feeds[i].create_time),
                    day: week[feeds[i].create_time.getDay()],
                    emoji: emojiArray,
                    myEmoji: userEmoji,
                    isReport: isReport,
                    isDelete: isDelete
                };
                feedResponse.push(myFeed);
            }
            const responseDTO = {
                status: 200,
                isNew: user.is_feed_new,
                hasFeed: hasFeed,
                userCount: userCount,
                data: feedResponse
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