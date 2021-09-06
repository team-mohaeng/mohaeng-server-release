import { SERVER_ERROR_MESSAGE } from "../constant";
import CompleteCourseResponseDTO, { TotalCompleteChallengeResponseDTO, TotalCompleteCourseResponseDTO, WrapCompleteCourseResponseDTO } from '../dto/Course/Complete/CompleteCourseResponseDTO';
import CourseLibraryResponseDTO, { SimpleCourseResponseDTO } from '../dto/Course/Library/CourseLibraryResponseDTO';
import { courses } from '../dummy/Course';
import { notExistUser } from "../errors";
import { getDay, getMonth, getYear } from '../formatter/mohaengDateFormatter';
import { IFail } from "../interfaces/IFail";
import { CompleteCourse } from "../models/CompleteCourse";
import { User } from "../models/User";

export default {
  library: async (id: String) => {
    try {
      const userId = Number(id);
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return notExistUser;
      }

      const currentCourseId = user.current_course_id;
      console.log("현재 진행 중인 코스 아이디: " + currentCourseId);
      const isProgress = currentCourseId != null ? true : false;

      const completeCourses = await CompleteCourse.findAll({
        attributes: ["course_id", "end_date"],
        where: { user_id: userId },
      });

      let beforeCourses: SimpleCourseResponseDTO[] = [];
      let afterCourses: SimpleCourseResponseDTO[] = [];

      for (let i = 0; i < courses.length; ++i) {
        let flag = false;
        if ((i+1) == currentCourseId) {
          continue; // 현재 진행 중인 코스면 skip
        }
        
        // 완료한 코스일 경우
        for (let j = 0; j < completeCourses.length; ++j) {
          if (completeCourses[j].course_id == (i + 1)) {
            afterCourses.push({
              id: courses[i+1].getId(),
              situation: 2,
              property: courses[i+1].getProperty(),
              title: courses[i+1].getTitle(),
              description: courses[i+1].getDescription(),
              totalDays: courses[i+1].getTotalDays()
            });
            flag = true;
            break;
          }
        }

        // 진행 전인 코스일 경우
        if (!flag) {
          beforeCourses.push({
            id: courses[i].getId(),
            situation: 0,
            property: courses[i].getProperty(),
            title: courses[i].getTitle(),
            description: courses[i].getDescription(),
            totalDays: courses[i].getTotalDays()
          });
        }
      }

      const responseDTO: CourseLibraryResponseDTO = {
        status: 200,
        data: {
          isProgress: isProgress,
          courses: beforeCourses.concat(afterCourses),
        },
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
  },
  complete: async (id: String) => {
    try {
      let userId = Number(id);
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return notExistUser;
      }

      const completeCourses = await CompleteCourse.findAll({ where: { user_id: userId } });
      if (completeCourses.length == 0) {
        const notExistCompleteCourse: CompleteCourseResponseDTO = {
          status: 202,
          data: {
            courses: []
          }
        }
        return notExistCompleteCourse;
      }

      let responseCourses: TotalCompleteCourseResponseDTO[] = [];

      for (let i = 0; i < completeCourses.length; ++i) {
        let responseChallenges: TotalCompleteChallengeResponseDTO[] = [];
        const dates = completeCourses[i].challenge_dates.split(",");
        const courseId = completeCourses[i].course_id-1;

        const challenges = courses[courseId].getChallenges();
        for (let j = 0; j < challenges.length; ++j) {
          let challenge = challenges[j];
          const completeDate = new Date(dates[j]);
          const year = getYear(completeDate);
          const month = getMonth(completeDate);
          const date = getDay(completeDate);

          responseChallenges.push({
            day: challenge.getDay(),
            situation: 2,
            title: challenge.getTitle(),
            happy: challenge.getHappy(),
            beforeMent: challenge.getBeforeMent(),
            afterMent: challenge.getAfterMent(),
            year: year,
            month: month,
            date: date
          });
        }

        const course = courses[courseId];
        const completeDate = new Date(completeCourses[i].end_date);
        const year = getYear(completeDate);
        const month = getMonth(completeDate);
        const date = getDay(completeDate);
        responseCourses.push({
          id: course.getId(),
          situation: 2,
          property: course.getProperty(),
          title: course.getTitle(),
          description: course.getDescription(),
          totalDays: course.getTotalDays(),
          year: year,
          month: month,
          date: date,
          challenges: responseChallenges
        });
      }

      const responseDTO: CompleteCourseResponseDTO = {
        status: 200,
        data: {
          courses: responseCourses
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
  },
};
