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
const Badge_2 = require("../models/Badge");
const Image_1 = require("../dummy/Image");
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
            let sortCourses = Course_1.courses.sort((a, b) => (a.getTitle() < b.getTitle() ? -1 : 1));
            for (let i = 0; i < sortCourses.length; ++i) {
                let flag = false;
                let course = sortCourses[i];
                if (isProgress && course.getId() == currentCourseId) {
                    continue; // 현재 진행 중인 코스면 skip
                }
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
            const currentCourseId = user.current_course_id;
            const isProgress = currentCourseId != null ? true : false;
            const completeCourses = await CompleteCourse_1.CompleteCourse.findAll({
                where: { user_id: id },
                order: [['end_date', 'DESC']]
            });
            if (completeCourses.length == 0) {
                const notExistCompleteCourse = {
                    status: 202,
                    data: {
                        isProgress: isProgress,
                        courses: []
                    }
                };
                return notExistCompleteCourse;
            }
            let responseCourses = [];
            let responseId = 1;
            Course_1.courses.sort((a, b) => (a.getId() < b.getId() ? -1 : 1));
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
                    index: responseId++,
                    id: courseId+1,
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
                    isProgress: isProgress,
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
    start: async (id, courseId, client) => {
        try {
            if (!client) {
                return errors_1.invalidClient;
            }
            let user = await User_1.User.findOne({
                attributes: ['nickname', 'current_course_id', 'current_challenge_id', 'is_completed', 'complete_challenge_count', 'character_card', 'challenge_success_count'],
                where: { id: id }
            });
            const userCharacterCard = user.character_card;
            if (!user) {
                return errors_1.notExistUser;
            }
            const cid = Number(courseId) - 1;
            if ((cid + 1) > Course_1.courses.length || (cid + 1) < 0) {
                return errors_1.notExistCourseId;
            }
            Course_1.courses.sort((a, b) => (a.getId() < b.getId() ? -1 : 1));
            let challenges = Course_1.courses[cid].getChallenges();
            let isPenalty = false;
            // 코스 변경인 경우
            if (user.current_course_id != null && user.current_challenge_id != null) {
                // 패널티 부여
                isPenalty = true;
                // 챌린지 삭제
                BeforeChallenge_1.BeforeChallenge.destroy({ where: { user_id: id } });
                ProgressChallenge_1.ProgressChallenge.destroy({ where: { user_id: id } });
                CompleteChallenge_1.CompleteChallenge.destroy({ where: { user_id: id } });
            }
            // 코스 진행하기
            User_1.User.update({
                current_course_id: cid + 1,
                current_challenge_id: 1,
                current_progress_percent: 0,
                is_completed: false,
                challenge_penalty: isPenalty,
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
                let badges = [];
                if (i == 0) {
                    situation = 1;
                    // 진행할 챌린지에 대해서 뱃지 조건
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
                        if (!badge)
                            badges.push(Badge_1.challengeCountBadges[0].getName());
                    }
                }
                // 챌린지 멘트 부분에 ㅁㅁㅁ 부분에 유저 닉네임 적용
                startChallenges.push({
                    day: challenge.getDay(),
                    situation: situation,
                    title: challenge.getTitle(),
                    happy: challenge.getHappy(),
                    beforeMent: challenge.getBeforeMent().replace(/ㅁㅁㅁ/gi, user.nickname),
                    afterMent: challenge.getAfterMent().replace(/ㅁㅁㅁ/gi, user.nickname),
                    year: "",
                    month: "",
                    date: "",
                    badges: badges
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
            const imageURLs = (client == "ios") ? Image_1.images[userCharacterCard - 1].getIosImageURLs() : Image_1.images[user.character_card - 1].getAosImageURLs();
            const responseDTO = {
                status: 200,
                data: {
                    isComplete: false,
                    isPenalty: isPenalty,
                    mainCharacterImg: imageURLs[0],
                    popupCharacterImg: imageURLs[1],
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