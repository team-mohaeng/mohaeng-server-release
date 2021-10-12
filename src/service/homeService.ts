import { SERVER_ERROR_MESSAGE } from '../constant';
import { IFail } from "../interfaces/IFail";
import { User } from '../models/User';
import { notExistUser } from "../errors";
import HomeResponseDTO, { UserCourseResponseDTO } from '../dto/Home/HomeResponseDTO';
import { courses } from '../dummy/Course';
import { levels } from '../dummy/Level';

export default {
  home: async (id: string) => {
    try {
      // 닉네임, 레벨, 해피지수, 현재 코스, 현재 챌린지, 현재 코스 진행률, 캐릭터 스킨, 스타일 업데이트 여부
      const user = await User.findOne({
        attributes: ['nickname', 'level', 'affinity', 'current_course_id', 'current_challenge_id', 'current_progress_percent', 'character_skin', 'is_style_new', 'is_badge_new'],
        where: { id: id }
      });

      if (!user) {
        return notExistUser;
      }

      let courseResponseDTO: UserCourseResponseDTO = {};
      if (user.current_course_id && user.current_challenge_id && user.current_progress_percent) {
        const courseId = user.current_course_id - 1;
        const challengeId = user.current_challenge_id - 1;
        courseResponseDTO = {
          challengeTitle: courses[courseId].getChallenges()[challengeId].getTitle(),
          percent: user.current_progress_percent
        };
      }

      const responseDTO: HomeResponseDTO = {
        status: 200,
        data: {
          nickname: user.nickname,
          level: user.level,
          happy: user.affinity,
          fullHappy: levels[user.level - 1].getFullHappy(),
          characterSkin: user.character_skin + ".url",
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