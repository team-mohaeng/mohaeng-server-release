"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
const Course_1 = require("../dummy/Course");
const Badge_1 = require("../dummy/Badge");
const errors_1 = require("../errors");
const mohaengDateFormatter_1 = require("../formatter/mohaengDateFormatter");
const User_1 = require("../models/User");
const CompleteChallenge_1 = require("../models/CompleteChallenge");
exports.default = {
    today: async (id) => {
        try {
            // 닉네임, 현재 진행 중인 코스 아이디, 현재 진행 중인 챌린지 아이디, 챌린지 수행 여부, 코스 변경 패널티 여부
            // 완료한 챌린지 개수, 연속 수행한 챌린지 개수, 현재 유저의 캐릭터 타입, 현재 유저의 캐릭터 카드
            const user = await User_1.User.findOne({
                attributes: ['nickname', 'current_course_id', 'current_challenge_id', 'is_completed', 'challenge_penalty',
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
                    // 패널티가 적용되지 않는다면 뱃지 부여 가능
                    if (!user.challenge_penalty) {
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
                            badges.push(Badge_1.challengeCountBadges[0].getName());
                        }
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
            const responseDTO = {
                status: 200,
                data: {
                    isComplete: user.is_completed,
                    isPenalty: user.challenge_penalty,
                    mainCharacterImg: "",
                    popupCharacterImg: "",
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
};
//# sourceMappingURL=challengeService.js.map