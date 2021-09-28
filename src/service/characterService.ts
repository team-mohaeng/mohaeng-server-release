import { User } from "../models/User";
import { Skin } from "../models/Skin";
import { Character } from "../models/Character";
import { SetCharacterRequestDTO } from "../dto/Character/request/SetCharacterRequestDTO";
import { SetCharacterResponseDTO } from "../dto/Character/response/SetCharacterResponseDTO";
import { notExistUser, notExistSkin, notExistCharacter, serverError } from "../errors";

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
  }
}
