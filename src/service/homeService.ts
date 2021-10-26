import { SERVER_ERROR_MESSAGE } from '../constant';
import { IFail } from "../interfaces/IFail";
import { User } from '../models/User';
import { notExistUser, invalidClient } from "../errors";
import HomeResponseDTO, { UserCourseResponseDTO } from '../dto/Home/HomeResponseDTO';
import { courses } from '../dummy/Course';
import { levels } from '../dummy/Level';
import { images } from '../dummy/Image';
import { aosSkins, iosSkins, skins } from '../dummy/Skin';

export default {
  home: async (id: string, client: string) => {
    try {
      if (!client) {
        return invalidClient;
      }

      // 닉네임, 레벨, 해피지수, 현재 코스, 현재 챌린지, 현재 코스 진행률, 
      // 캐릭터 타입, 캐릭터 카드 아이디, 캐릭터 스킨, 스타일 업데이트 여부, 뱃지 업데이트 여부
      const user = await User.findOne({
        attributes: ['nickname', 'level', 'affinity', 'current_course_id', 'current_challenge_id', 'current_progress_percent',
          'character_type', 'character_card', 'character_skin', 'is_style_new', 'is_badge_new'],
        where: { id: id }
      });

      if (!user) {
        return notExistUser;
      }

      let courseResponseDTO: UserCourseResponseDTO = {};
      if (user.current_course_id != null && user.current_challenge_id != null && user.current_progress_percent != null) {
        const courseId = user.current_course_id - 1;
        const challengeId = user.current_challenge_id - 1;
        courseResponseDTO = {
          challengeTitle: courses[courseId].getChallenges()[challengeId].getTitle(),
          percent: user.current_progress_percent
        };
      }

      const skin = (client == "ios") ? iosSkins[user.character_skin - 64].getImageURL() : aosSkins[user.character_skin - 64].getImageURL();

      const responseDTO: HomeResponseDTO = {
        status: 200,
        data: {
          nickname: user.nickname,
          level: user.level,
          happy: user.affinity,
          fullHappy: levels[user.level - 1].getFullHappy(),
          characterLottie: images[user.character_card - 1].getLottieURL(),
          characterSkin: skin,
          isStyleNew: user.is_style_new,
          isBadgeNew: user.is_badge_new,
          course: courseResponseDTO
        }
      };

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