"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Skin_1 = require("../models/Skin");
const Character_1 = require("../models/Character");
const errors_1 = require("../errors");
exports.default = {
    setCharacter: async (userId, dto) => {
        try {
            const { characterSkin, characterType, characterCard } = dto;
            const user = await User_1.User.findOne({ attributes: ["id"], where: { id: userId } });
            if (!user) {
                return errors_1.notExistUser;
            }
            const skin = await Skin_1.Skin.findOne({ attributes: ["id"], where: { id: characterSkin, user_id: userId } });
            if (!skin) {
                return errors_1.notExistSkin;
            }
            const character = await Character_1.Character.findOne({ attributes: ["character_type", "character_card"], where: { user_id: userId, character_type: characterType, character_card: characterCard } });
            if (!character) {
                return errors_1.notExistCharacter;
            }
            User_1.User.update({
                character_skin: characterSkin,
                character_type: characterType,
                character_card: characterCard
            }, {
                where: { id: userId }
            });
            const responseDTO = {
                status: 200,
                message: "캐릭터를 변경했습니다."
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    }
};
//# sourceMappingURL=characterService.js.map