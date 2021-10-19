"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Skin_1 = require("../models/Skin");
const Character_1 = require("../models/Character");
const errors_1 = require("../errors");
const Character_2 = require("../dummy/Character");
const CharacterCard_1 = require("../dummy/CharacterCard");
const Skin_2 = require("../dummy/Skin");
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
    },
    getCharacter: async (id) => {
        try {
            const user = await User_1.User.findOne({ attributes: ["character_card", "character_skin"], where: { id: id } });
            if (!user) {
                return errors_1.notExistUser;
            }
            //현재캐릭터
            const currentCharacter = {
                id: user.character_card,
                image: CharacterCard_1.characterCards[user.character_card - 1].getImageURL()
            };
            //현재스킨
            const currentSkin = {
                id: user.character_skin,
                image: Skin_2.skins[user.character_skin - 64].getImageURL()
            };
            //캐릭터
            const characterArray = new Array(); //캐릭터 타입, 카드 배열
            let cardArray = new Array(); //캐릭터 카드 배열
            const cardIdArray = new Array(); //사용자가 가지고 있는 카드의 id만 담는 배열
            const userCards = await Character_1.Character.findAll({ where: { user_id: id } }); //사용자가 가지고 있는 카드 배열
            userCards.forEach(userCard => {
                cardIdArray.push(userCard.character_card);
            });
            for (let characterType = 1; characterType < Character_2.characters.length + 1; characterType++) { //캐릭터 타입 1~7
                let character = Character_2.characters[characterType - 1];
                for (let cardCount = 0; cardCount < character.getCards().length; cardCount++) { //카드 개수
                    let card = character.getCards()[cardCount]; //카드 하나씩 가져오기
                    //사용자가 카드를 가지고 있는 경우
                    if (cardIdArray.includes(card.getId())) {
                        const index = cardIdArray.indexOf(card.getId()); //카드 아이디를 가지고 있는 배열의 인덱스 값
                        const cardInfo = {
                            id: card.getId(),
                            image: card.getImageURL(),
                            hasCard: true,
                            isNew: userCards[index].is_new
                        };
                        cardArray.push(cardInfo);
                    }
                    else {
                        const cardInfo = {
                            id: card.getId(),
                            image: "",
                            hasCard: false,
                            isNew: false
                        };
                        cardArray.push(cardInfo);
                    }
                }
                const characterInfo = {
                    type: characterType,
                    cards: cardArray
                };
                characterArray.push(characterInfo);
                cardArray = []; //카드 배열 초기화, 다음 타입의 카드부터 다시 쌓음
            }
            //스킨
            const userSkins = await Skin_1.Skin.findAll({ where: { user_id: id } });
            const skinIdArray = new Array(); //skin id만 담는 배열
            userSkins.forEach(userSkin => {
                skinIdArray.push(userSkin.id);
            });
            const skinArray = new Array();
            Skin_2.skins.forEach(skin => {
                //사용자가 스킨을 가지고 있는 경우
                if (skinIdArray.includes(skin.getId())) {
                    const skinInfo = {
                        id: skin.getId(),
                        image: skin.getImageURL(),
                        hasSkin: true,
                    };
                    skinArray.push(skinInfo);
                }
                else {
                    const skinInfo = {
                        id: skin.getId(),
                        image: "",
                        hasSkin: false,
                    };
                    skinArray.push(skinInfo);
                }
            });
            const CharacterResponse = {
                currentCharacter: currentCharacter,
                currentSkin: currentSkin,
                characters: characterArray,
                skins: skinArray
            };
            const responseDTO = {
                status: 200,
                data: CharacterResponse
            };
            Character_1.Character.update({ is_new: false }, { where: { is_new: true, user_id: id } });
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    }
};
//# sourceMappingURL=characterService.js.map