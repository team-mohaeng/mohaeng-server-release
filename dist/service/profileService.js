"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const errors_1 = require("../errors");
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
    }
};
//# sourceMappingURL=profileService.js.map