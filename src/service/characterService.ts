import { User } from "../models/User";
import { Skin } from "../models/Skin";
import { Character } from "../models/Character";
import { SetCharacterRequestDTO } from "../dto/Character/Set/request/SetCharacterRequestDTO";
import { SetCharacterResponseDTO } from "../dto/Character/Set/response/SetCharacterResponseDTO";
import { notExistUser, notExistSkin, notExistCharacter, invalidParameter, serverError } from "../errors";
import { GetCharacterResponseDTO, CharacterResponseDTO, CurrentCharacterDTO, CurrentSkinDTO, CharacterDTO, cardDTO, SkinDTO } from "../dto/Character/Get/GetCharacterResponseDTO";
import { characters } from "../dummy/Character";
import { characterCards } from "../dummy/CharacterCard";
import { iosSkins } from "../dummy/Skin";
import { aosSkins } from "../dummy/Skin";

export default {
  setCharacter: async (userId: string, dto: SetCharacterRequestDTO) => {
    try{
      const { characterSkin, characterType, characterCard } = dto;
      const user = await User.findOne({ attributes: ["id"], where: { id: userId }});
      if (!user) {
        return notExistUser;
      }

      const skin = await Skin.findOne({ attributes: ["id"], where: { id: characterSkin, user_id: userId }})
      if (!skin) {
        return notExistSkin;
      }

      const character = await Character.findOne({ attributes: ["character_type", "character_card"], where: { user_id: userId, character_type: characterType, character_card: characterCard }});
      if (!character) {
        return notExistCharacter;
      }

      User.update({
        character_skin: characterSkin,
        character_type: characterType,
        character_card: characterCard
      }, {
        where: { id: userId }
      });
      
      const responseDTO: SetCharacterResponseDTO = {
        status: 200,
        message: "캐릭터를 변경했습니다."
      }
      return responseDTO;

    } catch (err) {
      console.error(err);
      return serverError;
    }
  },
  getCharacter: async (id: string, client: string) => {
    try{
      if (client != "aos" && client != "ios") {
        return invalidParameter;  
      }
      const user = await User.findOne({ attributes: ["character_card", "character_skin"], where: { id: id }});
      if (!user) {
        return notExistUser;
      }
      //현재캐릭터
      const currentCharacter: CurrentCharacterDTO = {
        id: user.character_card, 
        image: characterCards[user.character_card-1].getImageURL()
      }

      //현재스킨
      let currentSkin: CurrentSkinDTO;
      if (client == "ios") {
        currentSkin = {
          id: user.character_skin, 
          image: iosSkins[user.character_skin-64].getImageURL()
        }
      }

      else {
        currentSkin = {
          id: user.character_skin, 
          image: aosSkins[user.character_skin-64].getImageURL()
        }
      }
      
      //캐릭터
      const characterArray: Array<CharacterDTO> = new Array<CharacterDTO>(); //캐릭터 타입, 카드 배열
      let cardArray: Array<cardDTO> = new Array<cardDTO>(); //캐릭터 카드 배열
      const cardIdArray: Array<Number> = new Array<Number>(); //사용자가 가지고 있는 카드의 id만 담는 배열
      const userCards = await Character.findAll({ where: { user_id: id }}) //사용자가 가지고 있는 카드 배열
      userCards.forEach(userCard => {
        cardIdArray.push(userCard.character_card);
      })

      for(let characterType = 1; characterType < characters.length+1; characterType++) { //캐릭터 타입 1~7
        let character = characters[characterType-1];
        for (let cardCount = 0; cardCount < character.getCards().length; cardCount++) { //카드 개수
          let card = character.getCards()[cardCount]; //카드 하나씩 가져오기
          //사용자가 카드를 가지고 있는 경우
          if (cardIdArray.includes(card.getId())) {
            const index = cardIdArray.indexOf(card.getId()) //카드 아이디를 가지고 있는 배열의 인덱스 값
            const cardInfo: cardDTO = {
              id: card.getId(),
              image: card.getImageURL(),
              hasCard: true,
              isNew: userCards[index].is_new
            }
            cardArray.push(cardInfo);
          }
          else {
            const cardInfo: cardDTO = {
              id: card.getId(),
              image: "",
              hasCard: false,
              isNew: false
            }
            cardArray.push(cardInfo);
          }
        }
        const characterInfo: CharacterDTO = {
          type: characterType,
          cards: cardArray
        }
        characterArray.push(characterInfo);
        cardArray=[]; //카드 배열 초기화, 다음 타입의 카드부터 다시 쌓음
      }
      
      //스킨
      const userSkins = await Skin.findAll({ where: { user_id: id }});
      const skinIdArray: Array<Number> = new Array<Number>(); //skin id만 담는 배열
      userSkins.forEach(userSkin => {
        skinIdArray.push(userSkin.id);
      })
      
      const skinArray: Array<SkinDTO> = new Array<SkinDTO>();
      if (client == "ios") {
        iosSkins.forEach(skin => {
        //사용자가 스킨을 가지고 있는 경우
          if (skinIdArray.includes(skin.getId())) {
            const skinInfo: SkinDTO = {
              id: skin.getId(),
              image: skin.getImageURL(),
              hasSkin: true,
            }
            skinArray.push(skinInfo);
          }
          else {
            const skinInfo: SkinDTO = {
              id: skin.getId(),
              image: "",
              hasSkin: false,
            }
            skinArray.push(skinInfo);
          }
        });
      }

      else {
        aosSkins.forEach(skin => {
          //사용자가 스킨을 가지고 있는 경우
            if (skinIdArray.includes(skin.getId())) {
              const skinInfo: SkinDTO = {
                id: skin.getId(),
                image: skin.getImageURL(),
                hasSkin: true,
              }
              skinArray.push(skinInfo);
            }
            else {
              const skinInfo: SkinDTO = {
                id: skin.getId(),
                image: "",
                hasSkin: false,
              }
              skinArray.push(skinInfo);
            }
          });
      }
      

      const CharacterResponse: CharacterResponseDTO = {
        currentCharacter: currentCharacter,
        currentSkin: currentSkin,
        characters: characterArray,
        skins: skinArray
      }

      const responseDTO: GetCharacterResponseDTO = {
        status: 200,
        data: CharacterResponse
      }

      Character.update({ is_new: false }, { where: { is_new: true, user_id: id }});

      return responseDTO;

    } catch (err) {
      console.error(err);
      return serverError;
    }
  }
}
