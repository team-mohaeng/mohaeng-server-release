"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
const Course_1 = require("../dummy/Course");
const Badge_1 = require("../dummy/Badge");
const Level_1 = require("../dummy/Level");
const Skin_1 = require("../dummy/Skin");
const errors_1 = require("../errors");
const mohaengDateFormatter_1 = require("../formatter/mohaengDateFormatter");
const User_1 = require("../models/User");
const CompleteChallenge_1 = require("../models/CompleteChallenge");
const ProgressChallenge_1 = require("../models/ProgressChallenge");
const BeforeChallenge_1 = require("../models/BeforeChallenge");
const CompleteCourse_1 = require("../models/CompleteCourse");
const Badge_2 = require("../models/Badge");
const CharacterCard_1 = require("../dummy/CharacterCard");
const Skin_2 = require("../models/Skin");
const Character_1 = require("../models/Character");
const Image_1 = require("../dummy/Image");
exports.default = {
    today: async (id) => {
        try {
            // 닉네임, 현재 진행 중인 코스 아이디, 현재 진행 중인 챌린지 아이디, 챌린지 수행 여부, 코스 변경 패널티 여부
            // 완료한 챌린지 개수, 연속 수행한 챌린지 개수, 현재 유저의 캐릭터 타입, 현재 유저의 캐릭터 카드
            const user = await User_1.User.findOne({
                attributes: ['nickname', 'current_course_id', 'current_challenge_id', 'is_completed',
                    'complete_challenge_count', 'challenge_success_count', 'character_type', 'character_card'],
                where: { id: id }
            });
            // 유저가 없는 경우
            if (!user) {
                return errors_1.notExistUser;
            }
            // 진행 중인 코스가 없는 경우
            if (user.current_course_id == null) {
                return errors_1.notExistProgressCourse;
            }
            const courseId = user.current_course_id - 1; // 코스 아이디 (인덱스 접근때문에 -1)
            const challengeId = user.current_challenge_id - 1; // 챌린지 아이디 (인덱스 접근때문에 -1)
            // 완료한 챌린지 리스트를 challenge_id 기준으로 정렬해서 조회
            const completeChallenge = await CompleteChallenge_1.CompleteChallenge.findAll({
                attributes: ['challenge_id', 'date'],
                where: { user_id: id },
                order: ['challenge_id']
            });
            // 현재 진행 중인 코스
            const course = Course_1.courses[courseId];
            // 현재 코스의 챌린지들
            const challenges = course.getChallenges();
            let todayChallenges = [];
            let completeCourse = false;
            if (challenges.length - 1 == challengeId)
                completeCourse = true;
            for (let i = 0; i < challenges.length; i++) {
                const challenge = challenges[i]; // 현재 체크중인 챌린지
                let situation = 0;
                let year = "";
                let month = "";
                let date = "";
                let badges = [];
                if (i < challengeId) { // 완료한 챌린지
                    situation = 2;
                    // 챌린지를 완료한 날짜
                    const completeDate = completeChallenge.find(e => e.challenge_id == (i + 1)).date;
                    year = (0, mohaengDateFormatter_1.getYear)(completeDate);
                    month = (0, mohaengDateFormatter_1.getMonth)(completeDate);
                    date = (0, mohaengDateFormatter_1.getDay)(completeDate);
                }
                // 진행 중인 챌린지
                else if (i == challengeId) {
                    // 챌린지 수행 완료했다면
                    if (user.is_completed) {
                        situation = 2;
                        // 챌린지를 완료한 날짜
                        const completeDate = completeChallenge.find(e => e.challenge_id == (i + 1)).date;
                        year = (0, mohaengDateFormatter_1.getYear)(completeDate);
                        month = (0, mohaengDateFormatter_1.getMonth)(completeDate);
                        date = (0, mohaengDateFormatter_1.getDay)(completeDate);
                    }
                    // 챌린지 수행 전이라면
                    else {
                        situation = 1;
                    }
                    // 코스 완료라면
                    if (completeCourse) {
                        let propertyCount = [0, 0, 0, 0, 0, 0, 0];
                        const completeCourses = await CompleteCourse_1.CompleteCourse.findAll({
                            where: { user_id: id }
                        });
                        // 유저가 완료한 코스 속성을 카운트
                        // 현재 속성이 2개라면 3개 완료했으니까, 뱃지 부여
                        for (let i = 0; i < completeCourses.length; i++) {
                            propertyCount[Course_1.courses[completeCourses[i].course_id - 1].getProperty() - 1]++;
                        }
                        const currentProperty = course.getProperty();
                        if (propertyCount[currentProperty - 1] == 2) { // 코스 뱃지를 얻을 수 있는 경우
                            const courseBadge = Badge_1.courseBadges[currentProperty - 1];
                            const badge = await Badge_2.Badge.findAll({
                                where: {
                                    id: courseBadge.getId(),
                                    user_id: id
                                }
                            });
                            console.log(badge);
                            if (badge.length == 0)
                                badges.push(courseBadge.getName());
                        }
                    }
                    // 챌린지 수행 횟수 뱃지
                    if (user.complete_challenge_count + 1 == 3) {
                        badges.push(Badge_1.challengeBadges[0].getName());
                    }
                    else if (user.complete_challenge_count + 1 == 21) {
                        badges.push(Badge_1.challengeBadges[1].getName());
                    }
                    else if (user.complete_challenge_count + 1 == 49) {
                        badges.push(Badge_1.challengeBadges[2].getName());
                    }
                    // 챌린지 연속 21일 수행
                    if (user.challenge_success_count + 1 == 21) {
                        // 뱃지를 소유하고있지 않을 경우에만 부여
                        const badge = await Badge_2.Badge.findAll({
                            where: {
                                id: Badge_1.challengeCountBadges[0].getId(),
                                user_id: id
                            }
                        });
                        if (badge.length == 0)
                            badges.push(Badge_1.challengeCountBadges[0].getName());
                    }
                }
                // 진행 전인거는 따로 처리 필요 없음
                // 챌린지 멘트 부분에 ㅁㅁㅁ 부분에 유저 닉네임 적용
                todayChallenges.push({
                    day: challenge.getDay(),
                    situation: situation,
                    title: challenge.getTitle(),
                    happy: challenge.getHappy(),
                    beforeMent: challenge.getBeforeMent().replace(/ㅁㅁㅁ/gi, user.nickname),
                    afterMent: challenge.getAfterMent().replace(/ㅁㅁㅁ/gi, user.nickname),
                    year: year,
                    month: month,
                    date: date,
                    badges: badges
                });
            }
            // 코스 상태, 완료 날짜들
            let situation = 1;
            let year = "";
            let month = "";
            let date = "";
            // 마지막 챌린지를 완료했다면 (완료한 코스 조회의 경우)
            if (user.is_completed && challenges.length - 1 == challengeId) {
                situation = 2;
                // 현재 진행한 챌린지 날짜를 가져옴 (마지막 챌린지이기 때문에)
                const completeDate = completeChallenge.find(e => e.challenge_id == user.current_challenge_id).date;
                year = (0, mohaengDateFormatter_1.getYear)(completeDate);
                month = (0, mohaengDateFormatter_1.getMonth)(completeDate);
                date = (0, mohaengDateFormatter_1.getDay)(completeDate);
            }
            /*
            캐릭터 분기처리 해야함
            */
            const todayCourse = {
                id: course.getId(),
                situation: situation,
                property: course.getProperty(),
                title: course.getTitle(),
                totalDays: course.getTotalDays(),
                currentDay: challenges[challengeId].getDay(),
                year: year,
                month: month,
                date: date,
                challenges: todayChallenges
            };
            const imageURLs = Image_1.images[user.character_card - 1].getImageURLs();
            const responseDTO = {
                status: 200,
                data: {
                    isComplete: user.is_completed,
                    isPenalty: user.challenge_penalty,
                    mainCharacterImg: imageURLs[0],
                    popupCharacterImg: imageURLs[1],
                    course: todayCourse
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
            const serverError = {
                status: 500,
                message: constant_1.SERVER_ERROR_MESSAGE,
            };
            return serverError;
        }
    },
    certification: async (id, courseId, challengeId) => {
        try {
            let user_id = Number(id);
            let course_id = Number(courseId);
            let challenge_id = Number(challengeId);
            // 코스 아이디나 챌린지 아이디가 유효하지 않은 경우
            if (Course_1.courses.length < course_id) {
                return errors_1.notExistCourseId;
            }
            else if (Course_1.courses[course_id - 1].getChallenges().length < challenge_id) {
                return errors_1.notExistChallengeId;
            }
            // 유저 현재 해피지수, 레벨, 현재 코스 아이디, 현재 챌린지 아이디, 챌린지 완료 여부, 완료한 코스 개수, 완료한 챌린지 개수, 보유한 뱃지 개수
            // 챌린지 패널티 여부, 최근 챌린지 완료 날짜, 챌린지 연속 수행 횟수
            const user = await User_1.User.findOne({
                attributes: ['affinity', 'level', 'current_course_id', 'current_challenge_id', 'is_completed', 'complete_course_count', 'complete_challenge_count', 'badge_count',
                    'challenge_penalty', 'recent_challenge_date', 'challenge_success_count'],
                where: { id: id }
            });
            // 유저가 없는 경우
            if (!user) {
                return errors_1.notExistUser;
            }
            // 이미 유저가 챌린지를 인증한 경우
            if (user.is_completed) {
                return errors_1.alreadyCompleteChallenge;
            }
            // 현재 진행 중인 코스나 챌린지가 아닐 때
            if (user.current_course_id != course_id || user.current_challenge_id != challenge_id) {
                return errors_1.invalidCourseChallengeId;
            }
            const course = Course_1.courses[course_id - 1]; // 현재 코스
            const challenge = course.getChallenges()[challenge_id - 1]; // 현재 완료한 챌린지
            let userHappy = Number(user.affinity); // 유저에 업데이트될 해피지수
            let userLevel = Number(user.level); // 유저에 업데이트될 레벨
            let levelUp = false; // 레벨업 여부
            let canGetHappy = !user.challenge_penalty && (userLevel < 40); // 패널티가 없고 만렙이 아닐 경우만 해피지수를 얻을 수 있음
            let happy = 0; // 유저가 해당 단계에 받는 얻는 해피지수
            let completeCourse = false; // 챌린지 인증 시 코스 완료 여부
            let completeCourseCount = user.complete_course_count; // 완료한 코스 개수 -> 코스 완료라면 +1 처리
            const completeChallengeCount = user.complete_challenge_count + 1; // 완료한 챌린지 개수 -> +1 처리
            let challengeSuccessCount = user.challenge_success_count; // 챌린지 연속 수행 횟수
            let currentProgressPercent = Number((challenge.getDay() / course.getTotalDays()) * 100); // 현재 챌린지 진행상황
            let isBadgeNew = false; // 뱃지 부여 여부
            let badgeCount = user.badge_count; // 유저가 소유한 뱃지 개수
            let challengeCompletionDTO = {};
            let courseCompletionDTO = {};
            let levelUpDTO = {};
            if (canGetHappy) {
                // 현재 affinity에 userHappy를 더하면 레벨이 올라가는지 확인
                // 레벨업시 캐릭터 카드 부여 처리
                if (userHappy + challenge.getHappy() > Level_1.levels[userLevel - 1].getFullHappy()) {
                    const cardId = Level_1.levels[userLevel - 1].getCardId();
                    const characterId = Number((cardId - 1) / 9);
                    levelUp = true;
                    if (userLevel + 1 == 68) { // 만렙이면
                        happy = Level_1.levels[userLevel - 1].getFullHappy() - userHappy; // 레벨업으로 받는 해피지수가 달라짐
                        userHappy = 0;
                    }
                    else {
                        userHappy = userHappy + challenge.getHappy() - Level_1.levels[userLevel - 1].getFullHappy();
                        happy = challenge.getHappy();
                    }
                    userLevel++;
                    let styleImg = "";
                    if (cardId > 63) {
                        Skin_2.Skin.create({
                            id: cardId,
                            user_id: user_id
                        });
                        styleImg = Skin_1.skins[cardId - 64].getImageURL();
                    }
                    else {
                        Character_1.Character.create({
                            user_id: user_id,
                            character_type: characterId,
                            character_card: cardId
                        });
                        styleImg = CharacterCard_1.characterCards[cardId - 1].getImageURL();
                    }
                    // 레벨업 response
                    levelUpDTO = {
                        level: userLevel,
                        styleImg: styleImg
                    };
                }
                else {
                    userHappy += challenge.getHappy();
                    happy += challenge.getHappy();
                }
            }
            // 챌린지 response
            challengeCompletionDTO = {
                happy: (canGetHappy) ? happy : 0,
                userHappy: userHappy,
                fullHappy: Level_1.levels[userLevel - 1].getFullHappy(),
                isPenalty: user.challenge_penalty
            };
            // 코스 완료라면
            if (course.getTotalDays() == challenge.getDay()) {
                completeCourse = true; // 코스 완료 여부 true
                completeCourseCount++; // 완료 코스 개수 +1
                // 챌린지 점수를 받아서 만렙으로 레벨업했을 경우
                if (levelUp && userLevel == 68)
                    canGetHappy = false;
                if (canGetHappy) {
                    // 현재 affinity에 userHappy를 더하면 레벨이 올라가는지 확인
                    // 레벨업시 캐릭터 카드 부여 처리
                    if (userHappy + course.getHappy() > Level_1.levels[userLevel - 1].getFullHappy()) {
                        const cardId = Level_1.levels[userLevel - 1].getCardId();
                        const characterId = Number((cardId - 1) / 9);
                        levelUp = true;
                        if (userLevel + 1 == 68) {
                            happy = Level_1.levels[userLevel - 1].getFullHappy() - userHappy;
                            userHappy = 0;
                        }
                        else {
                            userHappy = userHappy + course.getHappy() - Level_1.levels[userLevel - 1].getFullHappy();
                            happy = course.getHappy();
                        }
                        userLevel++;
                        let styleImg = "";
                        if (cardId > 63) {
                            Skin_2.Skin.create({
                                id: cardId,
                                user_id: user_id
                            });
                            styleImg = Skin_1.skins[cardId - 64].getImageURL();
                        }
                        else {
                            Character_1.Character.create({
                                user_id: user_id,
                                character_type: characterId,
                                character_card: cardId
                            });
                            styleImg = CharacterCard_1.characterCards[cardId - 1].getImageURL();
                        }
                        // 레벨업 response
                        levelUpDTO = {
                            level: userLevel,
                            styleImg: styleImg
                        };
                    }
                    else {
                        userHappy += course.getHappy();
                        happy += course.getHappy();
                    }
                }
                // 코스 완료 response
                courseCompletionDTO = {
                    property: course.getProperty(),
                    title: course.getTitle(),
                    happy: (canGetHappy) ? happy : 0,
                    userHappy: userHappy,
                    fullHappy: Level_1.levels[userLevel - 1].getFullHappy(),
                };
            }
            // 마지막 챌린지 성공이 아니라면 BeforeChallenge 에서 챌린지 삭제
            // ProgressChallenge에 다음 챌린지 삽입
            if (!completeCourse) {
                BeforeChallenge_1.BeforeChallenge.destroy({
                    where: { user_id: id }
                });
                ProgressChallenge_1.ProgressChallenge.create({
                    user_id: user_id,
                    course_id: course_id,
                    challenge_id: challenge_id + 1
                });
            }
            // 다음 챌린지가 마지막 챌린지가 아니라면 BeforeChallenge에 다다음 챌린지 삽입
            if (course.getTotalDays() > challenge.getDay() + 1) {
                BeforeChallenge_1.BeforeChallenge.create({
                    user_id: user_id,
                    course_id: course_id,
                    challenge_id: challenge_id + 2
                });
            }
            // 인증한 챌린지 삭제
            ProgressChallenge_1.ProgressChallenge.destroy({
                where: {
                    user_id: id,
                    course_id: courseId,
                    challenge_id: challengeId
                }
            });
            // 인증한 챌린지 완료한 챌린지에 삽입
            CompleteChallenge_1.CompleteChallenge.create({
                user_id: Number(id),
                course_id: Number(courseId),
                challenge_id: Number(challengeId)
            });
            const today = new Date(); // 오늘
            let recentChallengeDate = new Date(); // DB에 저장된 최근 챌린지 완료 날짜 다음날
            recentChallengeDate = new Date(recentChallengeDate.setDate(user.recent_challenge_date.getDate() + 1));
            // 챌린지 연속 수행 여부
            if ((0, mohaengDateFormatter_1.getYear)(today) == (0, mohaengDateFormatter_1.getYear)(recentChallengeDate) && (0, mohaengDateFormatter_1.getMonth)(today) == (0, mohaengDateFormatter_1.getMonth)(recentChallengeDate) && (0, mohaengDateFormatter_1.getDay)(today) == (0, mohaengDateFormatter_1.getDay)(recentChallengeDate)) { // 연속 수행에 성공한 경우
                challengeSuccessCount++;
            }
            else {
                challengeSuccessCount = 1;
            }
            // 코스 완료라면 코스 뱃지를 얻을 수 있음
            if (completeCourse) {
                let propertyCount = [0, 0, 0, 0, 0, 0, 0];
                const completeCourses = await CompleteCourse_1.CompleteCourse.findAll({
                    where: { user_id: id }
                });
                // 유저가 완료한 코스 속성을 카운트
                // 현재 속성이 2개라면 3개 완료했으니까, 뱃지 부여
                for (let i = 0; i < completeCourses.length; i++) {
                    propertyCount[Course_1.courses[completeCourses[i].course_id - 1].getProperty() - 1]++;
                }
                const currentProperty = course.getProperty();
                if (propertyCount[currentProperty - 1] == 2) { // 코스 뱃지를 얻을 수 있는 경우
                    isBadgeNew = true; // 뱃지 부여 여부 true
                    Badge_2.Badge.create({
                        id: currentProperty,
                        user_id: id
                    });
                    badgeCount++; // 뱃지 개수 +1
                }
            }
            // 챌린지 수행 횟수 뱃지
            // 받을 수 있다면, 뱃지 부여 여부 true & 뱃지 개수 +1
            if (completeChallengeCount == 3) {
                isBadgeNew = true;
                // 챌린지 한걸음
                Badge_2.Badge.create({
                    id: 8,
                    user_id: id
                });
                badgeCount++;
            }
            else if (completeChallengeCount == 21) {
                isBadgeNew = true;
                // 성장한 챌린저
                Badge_2.Badge.create({
                    id: 9,
                    user_id: id
                });
                badgeCount++;
            }
            else if (completeChallengeCount == 49) {
                isBadgeNew = true;
                // 챌린지 챔피언
                Badge_2.Badge.create({
                    id: 10,
                    user_id: id
                });
                badgeCount++;
            }
            // 챌린지 연속 수행 뱃지
            if (challengeSuccessCount == 21) {
                // 뱃지를 소유하고있지 않을 경우에만 부여
                const badge = await Badge_2.Badge.findAll({
                    where: {
                        id: Badge_1.challengeCountBadges[0].getId(),
                        user_id: id
                    }
                });
                if (badge.length == 0) {
                    isBadgeNew = true;
                    Badge_2.Badge.create({
                        id: Badge_1.challengeCountBadges[0].getId(),
                        user_id: id
                    });
                    badgeCount++;
                }
            }
            // 유저 정보 업데이트
            User_1.User.update({
                affinity: userHappy,
                level: userLevel,
                current_progress_percent: currentProgressPercent,
                is_completed: true,
                complete_course_count: completeCourseCount,
                complete_challenge_count: completeChallengeCount,
                badge_count: badgeCount,
                challenge_penalty: false,
                is_badge_new: isBadgeNew,
                is_style_new: levelUp,
                recent_challenge_date: today,
                challenge_success_count: challengeSuccessCount
            }, { where: { id: id } });
            const responseDTO = {
                status: 200,
                data: {
                    characterImg: "",
                    challengeCompletion: challengeCompletionDTO,
                    courseCompletion: courseCompletionDTO,
                    levelUp: levelUpDTO
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err.message);
            const serverError = {
                status: 500,
                message: constant_1.SERVER_ERROR_MESSAGE,
            };
            return serverError;
        }
    },
};
//# sourceMappingURL=challengeService.js.map