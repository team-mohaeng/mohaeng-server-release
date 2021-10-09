"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const errors_1 = require("../errors");
const CompleteCourse_1 = require("../models/CompleteCourse");
const Course_1 = require("../dummy/Course");
exports.default = {
    nickname: async (id, dto) => {
        try {
            const { nickname } = dto;
            const user = await User_1.User.findOne({ attributes: ['nickname'], where: { id: id } });
            if (!user) {
                return errors_1.notExistUser;
            }
            if (nickname.length > 6 || nickname.length == 0) {
                return errors_1.nicknameLengthCheck;
            }
            if (nickname == user.nickname) {
                return errors_1.sameNickname;
            }
            const hasNickname = await User_1.User.findOne({ attributes: ['nickname'], where: { nickname: nickname } });
            if (hasNickname) {
                return errors_1.alreadyExistNickname;
            }
            await User_1.User.update({
                nickname: nickname
            }, {
                where: { id: id }
            });
            const responseDTO = {
                status: 200,
                message: "닉네임을 변경했습니다."
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
    myPage: async (id) => {
        try {
            const user = await User_1.User.findOne({ attributes: ["nickname", "email", "complete_course_count", "complete_challenge_count", "feed_count", "badge_count"], where: { id: id } });
            if (!user) {
                return errors_1.notExistUser;
            }
            const completeChallenge = await CompleteCourse_1.CompleteCourse.findAll({ attributes: ["course_id", "challenge_dates"], where: { user_id: id } });
            const calendarArray = new Array();
            for (let i = 0; i < completeChallenge.length; i++) {
                let courseId = completeChallenge[i].course_id - 1; //index 때문에 -1
                let dateArray = completeChallenge[i].challenge_dates.split(",");
                let calendar = {
                    property: Course_1.courses[courseId].getProperty(),
                    date: dateArray
                };
                calendarArray.push(calendar);
            }
            const myPage = {
                nickname: user.nickname,
                email: user.email,
                completeCourseCount: user.complete_course_count,
                completeChallengeCount: user.complete_challenge_count,
                feedCount: user.feed_count,
                badgeCount: user.badge_count,
                calendar: calendarArray
            };
            const responseDTO = {
                status: 200,
                data: myPage
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    }
};
//# sourceMappingURL=profileService.js.map