"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = require("../dummy/Course");
const mohaengDateFormatter_1 = require("../formatter/mohaengDateFormatter");
const CompleteChallenge_1 = require("../models/CompleteChallenge");
const CompleteCourse_1 = require("../models/CompleteCourse");
const User_1 = require("../models/User");
exports.default = {
    init: async () => {
        try {
            // 아이디, 현재 진행 중인 코스, 현재 진행 중인 챌린지, 현재 진행률, 챌린지 성공여부
            const users = await User_1.User.findAll({
                attributes: ['id', 'current_course_id', 'current_challenge_id', 'current_progress_percent', 'is_completed']
            });
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const id = user.id;
                // 현재 진행 중인 코스 아이디, 챌린지 아이디, 진행 퍼센트
                let currentCourseId = user.current_course_id;
                let currentChallengeId = user.current_challenge_id;
                let currentProgressPercent = user.current_progress_percent;
                // 코스 진행 중이 아니라면 처리할 것 없음
                if (currentCourseId == null && currentChallengeId == null) {
                    continue;
                }
                // 챌린지를 완료했다면
                if (user.is_completed) {
                    // 완료 챌린지들 가져오기
                    const completeChallenges = await CompleteChallenge_1.CompleteChallenge.findAll({
                        where: { user_id: id },
                        order: ['challenge_id']
                    });
                    // 코스 완료라면
                    if (completeChallenges.length == Course_1.courses[user.current_course_id - 1].getChallenges().length) {
                        let dates = "";
                        // 날짜 ,로 구분해서 저장
                        for (let j = 0; j < completeChallenges.length; j++) {
                            let temp = completeChallenges[j].date;
                            dates += (0, mohaengDateFormatter_1.getYear)(temp) + "-" + (0, mohaengDateFormatter_1.getMonth)(temp) + "-" + (0, mohaengDateFormatter_1.getDay)(temp) + ",";
                        }
                        dates = dates.substr(0, dates.length - 1); // 맨 마지막 , 빼주기
                        CompleteCourse_1.CompleteCourse.create({
                            user_id: id,
                            course_id: currentCourseId,
                            start_date: completeChallenges[0].date,
                            end_date: completeChallenges[completeChallenges.length - 1].date,
                            challenge_dates: dates
                        });
                        CompleteChallenge_1.CompleteChallenge.destroy({
                            where: { user_id: id }
                        });
                        // CompleteCourse에 업데이트 후 null, 0 처리
                        currentCourseId = null;
                        currentChallengeId = null;
                        currentProgressPercent = 0;
                    }
                    else {
                        currentChallengeId++;
                    }
                }
                // 유저 업데이트
                User_1.User.update({
                    current_course_id: currentCourseId,
                    current_challenge_id: currentChallengeId,
                    current_progress_percent: currentProgressPercent,
                    is_completed: false
                }, { where: { id: id } });
                console.log('********************* init success *********************');
            }
        }
        catch (err) {
            console.log('********************* init error *********************');
            console.error(err.message);
        }
    }
};
//# sourceMappingURL=courseInit.js.map