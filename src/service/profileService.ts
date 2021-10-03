import { User } from "../models/User";
import { ChangeNicknameRequestDTO } from "../dto/Profile/Nickname/request/ChangeNicknameRequestDTO";
import { ChangeNicknameResponseDTO } from "../dto/Profile/Nickname/response/ChangeNicknameResponseDTO";
import { notExistUser, nicknameLengthCheck, sameNickname, alreadyExistNickname, serverError } from "../errors";
import { CompleteCourse } from "../models/CompleteCourse";
import { MyPageResponseDTO, MyPageDTO, CalendarDTO } from "../dto/Profile/MyPage/MyPageResponseDTO";
import { courses } from "../dummy/Course";

export default {
  changeNickname: async (id: string, dto: ChangeNicknameRequestDTO) => {
    try{
      const { nickname } = dto;
      const user = await User.findOne({ attributes: ['nickname'], where: {id: id} });
      
      if (!user) {
        return notExistUser;
      }

      if ( nickname.length > 6 || nickname.length == 0 ) {
        return nicknameLengthCheck;
      }
    
      if (nickname == user.nickname) {
        return sameNickname;
      }
      
      const hasNickname = await User.findOne({ attributes: ['nickname'], where: {nickname: nickname } });
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
  },
  myPage: async (id: string) => {
    try{
      const user = await User.findOne({ attributes: ["nickname", "email", "complete_course_count", "complete_challenge_count", "feed_count", "badge_count"], where: { id: id }});
      
      if (!user) {
        return notExistUser;
      }

      const completeChallenge = await CompleteCourse.findAll({ attributes: ["course_id", "challenge_dates"], where: { user_id: id }})
      const calendarArray: Array<CalendarDTO> = new Array<CalendarDTO>();

      for (let i=0; i<completeChallenge.length; i++) {
        let courseId = completeChallenge[i].course_id - 1 //index 때문에 -1
        let calendar: CalendarDTO = {
          property: courses[courseId].getProperty(),
          date: completeChallenge[i].challenge_dates
        }
        calendarArray.push(calendar);
      }

      const myPage: MyPageDTO = {
        nickname: user.nickname,
        email: user.email,
        completeCourseCount: user.complete_course_count,
        completeChallengeCount: user.complete_challenge_count,
        feedCount: user.feed_count,
        badgeCount: user.badge_count,
        calendar: calendarArray
      }
      
      const responseDTO: MyPageResponseDTO = {
        status: 200,
        data: myPage
      }
      return responseDTO;

    } catch (err) {
      console.error(err);
      return serverError;
    }
  }
}
