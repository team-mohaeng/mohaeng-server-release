import { User } from "../models/User";
import { ChangeNicknameRequestDTO } from "../dto/Profile/Nickname/request/ChangeNicknameRequestDTO";
import { ChangeNicknameResponseDTO } from "../dto/Profile/Nickname/response/ChangeNicknameResponseDTO";
import { notExistUser, nicknameLengthCheck, sameNickname, alreadyExistNickname, serverError } from "../errors";

export default {
  nickname: async (id: string, dto: ChangeNicknameRequestDTO) => {
    try{
      const { nickname } = dto;
      const user = await User.findOne({ attributes: ['nickname'], where: { id: id }});
      
      if (!user) {
        return notExistUser;
      }

      if ( nickname.length > 6 || nickname.length == 0 ) {
        return nicknameLengthCheck;
      }
    
      if (nickname == user.nickname) {
        return sameNickname;
      }
      
      const hasNickname = await User.findOne({ attributes: ['nickname'], where: { nickname: nickname } });
      if (hasNickname) {
        return alreadyExistNickname;
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
      console.error(err);
      return serverError;
    }
  }
}
