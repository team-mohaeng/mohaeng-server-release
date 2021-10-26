"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
const User_1 = require("../models/User");
const errors_1 = require("../errors");
const Course_1 = require("../dummy/Course");
const Level_1 = require("../dummy/Level");
const Image_1 = require("../dummy/Image");
const Skin_1 = require("../dummy/Skin");
exports.default = {
    home: async (id, client) => {
        try {
            if (!client) {
                return errors_1.invalidClient;
            }
            // 닉네임, 레벨, 해피지수, 현재 코스, 현재 챌린지, 현재 코스 진행률, 
            // 캐릭터 타입, 캐릭터 카드 아이디, 캐릭터 스킨, 스타일 업데이트 여부, 뱃지 업데이트 여부
            const user = await User_1.User.findOne({
                attributes: ['nickname', 'level', 'affinity', 'current_course_id', 'current_challenge_id', 'current_progress_percent',
                    'character_type', 'character_card', 'character_skin', 'is_style_new', 'is_badge_new'],
                where: { id: id }
            });
            if (!user) {
                return errors_1.notExistUser;
            }
            let courseResponseDTO = {};
            if (user.current_course_id != null && user.current_challenge_id != null && user.current_progress_percent != null) {
                const courseId = user.current_course_id - 1;
                const challengeId = user.current_challenge_id - 1;
                courseResponseDTO = {
                    challengeTitle: Course_1.courses[courseId].getChallenges()[challengeId].getTitle(),
                    percent: user.current_progress_percent
                };
            }
            const skin = (client == "ios") ? Skin_1.iosSkins[user.character_skin - 64].getImageURL() : Skin_1.aosSkins[user.character_skin - 64].getImageURL();
            const responseDTO = {
                status: 200,
                data: {
                    nickname: user.nickname,
                    level: user.level,
                    happy: user.affinity,
                    fullHappy: Level_1.levels[user.level - 1].getFullHappy(),
                    characterLottie: Image_1.images[user.character_card - 1].getLottieURL(),
                    characterSkin: skin,
                    isStyleNew: user.is_style_new,
                    isBadgeNew: user.is_badge_new,
                    course: courseResponseDTO
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
//# sourceMappingURL=homeService.js.map