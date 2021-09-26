"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
const Course_1 = require("../dummy/Course");
const Badge_1 = require("../dummy/Badge");
const errors_1 = require("../errors");
const mohaengDateFormatter_1 = require("../formatter/mohaengDateFormatter");
const BeforeChallenge_1 = require("../models/BeforeChallenge");
const CompleteChallenge_1 = require("../models/CompleteChallenge");
const CompleteCourse_1 = require("../models/CompleteCourse");
const ProgressChallenge_1 = require("../models/ProgressChallenge");
const User_1 = require("../models/User");
exports.default = {
    library: async (id) => {
        try {
            const user = await User_1.User.findOne({ where: { id: id } });
            if (!user) {
                return errors_1.notExistUser;
            }
            const currentCourseId = user.current_course_id;
            const isProgress = currentCourseId != null ? true : false;
            const completeCourses = await CompleteCourse_1.CompleteCourse.findAll({
                attributes: ["course_id"],
                group: ["user_id", "course_id"],
                where: { user_id: id },
                order: ["course_id"]
            });
            let beforeCourses = [];
            let afterCourses = [];
            for (let i = 0; i < Course_1.courses.length; ++i) {
                let flag = false;
                if (isProgress && (i + 1) == currentCourseId) {
                    continue; // 현재 진행 중인 코스면 skip
                }
                let course = Course_1.courses[i];
                // 완료한 코스일 경우
                for (let j = 0; j < completeCourses.length; ++j) {
                    if (completeCourses[j].course_id == course.getId()) {
                        afterCourses.push({
                            id: course.getId(),
                            situation: 2,
                            property: course.getProperty(),
                            title: course.getTitle(),
                            description: course.getDescription(),
                            totalDays: course.getTotalDays()
                        });
                        flag = true;
                        break;
                    }
                }
                // 진행 전인 코스일 경우
                if (!flag) {
                    beforeCourses.push({
                        id: course.getId(),
                        situation: 0,
                        property: course.getProperty(),
                        title: course.getTitle(),
                        description: course.getDescription(),
                        totalDays: course.getTotalDays()
                    });
                }
            }
            const responseDTO = {
                status: 200,
                data: {
                    isProgress: isProgress,
                    courses: beforeCourses.concat(afterCourses),
                },
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
    complete: async (id) => {
        try {
            const user = await User_1.User.findOne({ where: { id: id } });
            if (!user) {
                return errors_1.notExistUser;
            }
            const completeCourses = await CompleteCourse_1.CompleteCourse.findAll({ where: { user_id: id } });
            if (completeCourses.length == 0) {
                const notExistCompleteCourse = {
                    status: 202,
                    data: {
                        courses: []
                    }
                };
                return notExistCompleteCourse;
            }
            let responseCourses = [];
            for (let i = 0; i < completeCourses.length; ++i) {
                let responseChallenges = [];
                const dates = completeCourses[i].challenge_dates.split(",");
                const courseId = completeCourses[i].course_id - 1;
                const challenges = Course_1.courses[courseId].getChallenges();
                for (let j = 0; j < challenges.length; ++j) {
                    let challenge = challenges[j];
                    const completeDate = new Date(dates[j]);
                    const year = (0, mohaengDateFormatter_1.getYear)(completeDate);
                    const month = (0, mohaengDateFormatter_1.getMonth)(completeDate);
                    const date = (0, mohaengDateFormatter_1.getDay)(completeDate);
                    responseChallenges.push({
                        day: challenge.getDay(),
                        situation: 2,
                        title: challenge.getTitle(),
                        year: year,
                        month: month,
                        date: date
                    });
                }
                const course = Course_1.courses[courseId];
                const completeDate = new Date(completeCourses[i].end_date);
                const year = (0, mohaengDateFormatter_1.getYear)(completeDate);
                const month = (0, mohaengDateFormatter_1.getMonth)(completeDate);
                const date = (0, mohaengDateFormatter_1.getDay)(completeDate);
                responseCourses.push({
                    id: course.getId(),
                    situation: 2,
                    property: course.getProperty(),
                    title: course.getTitle(),
                    totalDays: course.getTotalDays(),
                    year: year,
                    month: month,
                    date: date,
                    challenges: responseChallenges
                });
            }
            const responseDTO = {
                status: 200,
                data: {
                    courses: responseCourses
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
    start: async (id, courseId) => {
        try {
            let user = await User_1.User.findOne({
                attributes: ['nickname', 'current_course_id', 'current_challenge_id', 'is_completed', 'challenge_success_count'],
                where: { id: id }
            });
            if (!user) {
                return errors_1.notExistUser;
            }
            const cid = Number(courseId) - 1;
            if ((cid + 1) > Course_1.courses.length || (cid + 1) < 0) {
                return errors_1.notExistCourseId;
            }
            let challenges = Course_1.courses[cid].getChallenges();
            // 코스 변경인 경우
            if (challenges.length > user.current_challenge_id) {
                // 패널티 부여
                User_1.User.update({ challenge_penalty: true }, { where: { id: id } });
                // 챌린지 삭제
                BeforeChallenge_1.BeforeChallenge.destroy({ where: { user_id: id } });
                ProgressChallenge_1.ProgressChallenge.destroy({ where: { user_id: id } });
                CompleteChallenge_1.CompleteChallenge.destroy({ where: { user_id: id } });
            }
            // 코스 진행하기
            User_1.User.update({
                current_course_id: cid + 1,
                current_challenge_id: 1,
                is_completed: false
            }, { where: { id: id } });
            ProgressChallenge_1.ProgressChallenge.create({
                user_id: Number(id),
                course_id: cid + 1,
                challenge_id: 1
            });
            BeforeChallenge_1.BeforeChallenge.create({
                user_id: Number(id),
                course_id: cid + 1,
                challenge_id: 2
            });
            let startChallenges = [];
            for (let i = 0; i < challenges.length; i++) {
                let situation = 0;
                let challenge = challenges[i];
                let badgeName = "";
                if (i == 0) {
                    situation = 1;
                    // 진행할 챌린지에 대해서 뱃지 조건
                    if (user.challenge_success_count + 1 == 3) {
                        badgeName = Badge_1.challengeBadges[0].getName();
                    }
                    else if (user.challenge_success_count + 1 == 21) {
                        badgeName = Badge_1.challengeBadges[1].getName();
                    }
                    else if (user.challenge_success_count + 1 == 49) {
                        badgeName = Badge_1.challengeBadges[2].getName();
                    }
                    console.log(badgeName);
                }
                startChallenges.push({
                    day: challenge.getDay(),
                    situation: situation,
                    title: challenge.getTitle(),
                    happy: challenge.getHappy(),
                    beforeMent: challenge.getBeforeMent(),
                    afterMent: challenge.getAfterMent(),
                    year: "",
                    month: "",
                    date: "",
                    badge: badgeName
                });
            }
            let course = Course_1.courses[cid];
            const startCourse = {
                id: course.getId(),
                situation: 1,
                property: course.getProperty(),
                title: course.getTitle(),
                totalDays: course.getTotalDays(),
                currentDay: 1,
                year: "",
                month: "",
                date: "",
                challenges: startChallenges
            };
            user = await User_1.User.findOne({
                attributes: ['challenge_penalty'],
                where: { id: id }
            });
            const responseDTO = {
                status: 200,
                data: {
                    isComplete: false,
                    isPenalty: user.challenge_penalty,
                    mainCharacterImg: "",
                    popupCharacterImg: "",
                    course: startCourse
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
    }
};
//# sourceMappingURL=courseService.js.map