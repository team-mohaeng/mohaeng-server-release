import { User } from "../models/User";
import { ChangeNicknameRequestDTO } from "../dto/MyPage/nickname/request/ChangeNicknameRequestDto";
import { ChangeNicknameResponseDTO } from "../dto/MyPage/nickname/response/ChangeNicknameResponseDto";
import { SERVER_ERROR_MESSAGE } from "../constant";
import { IFail } from "../interfaces/IFail";
import { notExistUser, characterLengthCheck, sameNickname, nicknameDuplication } from "../errors";

export default {
  changeNickname: async ( id: number, dto: ChangeNicknameRequestDTO) => {
    try{
      const { nickname } = dto;
      const user = await User.findOne({ attributes: ['nickname'], where: {id: id} });
      if (!user) {
        return notExistUser;
      }

      if ( nickname.length > 6 || nickname.length ==0 ) {
        return characterLengthCheck;
      }
    
      if (nickname == user.nickname) {
        return sameNickname;
      }
      
      const hasNickname = await User.findOne({ attributes: ['nickname'], where: {nickname: nickname} });
      if (hasNickname) {
        return nicknameDuplication;
      }
      
      await User.update({
        nickname: nickname
      }, {
        where: {id: id}
      });
      const responseDTO: ChangeNicknameResponseDTO = {
        status: 200,
        message: "닉네임을 변경했습니다."
      }
      return responseDTO;

    } catch (err) {
      console.error(err.message);
      const serverError: IFail = {
        status: 500,
        message: SERVER_ERROR_MESSAGE,
      };
      return serverError;
    }
  }
}