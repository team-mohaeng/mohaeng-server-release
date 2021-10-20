"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
const errors_1 = require("../errors");
const User_1 = require("../models/User");
const Message_1 = require("../models/Message");
const Image_1 = require("../dummy/Image");
exports.default = {
    chatting: async (id) => {
        try {
            const user = await User_1.User.findOne({
                attributes: ['nickname', 'character_card'],
                where: { id: id }
            });
            if (!user) {
                return errors_1.notExistUser;
            }
            const messages = await Message_1.Message.findAll({
                where: { user_id: id },
                order: ["date"]
            });
            let userMessageDTO = [];
            for (let i = 0; i < messages.length; i++) {
                const userMessage = messages[i];
                const ments = userMessage.ment.split("ㅡ");
                let mentList = [];
                for (let j = 0; j < ments.length; j++) {
                    mentList.push(ments[j].replace(/ㅁㅁㅁ/gi, user.nickname));
                }
                userMessageDTO.push({
                    date: userMessage.date,
                    message: mentList,
                    isNew: userMessage.is_new,
                });
            }
            Message_1.Message.update({ is_new: false }, { where: { user_id: id } });
            const responseDTO = {
                status: 200,
                data: {
                    profileImg: Image_1.images[user.character_card - 1].getProfileURL(),
                    messages: userMessageDTO
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
//# sourceMappingURL=messageService.js.map