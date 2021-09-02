import { SERVER_ERROR_MESSAGE } from "../constant";
import CourseLibraryResponseDTO, { SimpleCourseResponseDTO } from '../dto/Course/Library/CourseLibraryResponseDTO';
import { courses } from '../dummy/Course';
import { notExistUser } from "../errors";
import { getDay, getMonth, getYear } from '../formatter/mohaengDateFormatter';
import { IFail } from "../interfaces/IFail";
import { CompleteCourse } from "../models/CompleteCourse";
import { User } from "../models/User";

export default {
  library: async (id: number) => {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        return notExistUser;
      }

      const currentCourseId = user.current_course_id;
      console.log("현재 진행 중인 코스 아이디: " + currentCourseId);
      const isProgress = currentCourseId != null ? true : false;

      const completeCourses = await CompleteCourse.findAll({
        attributes: ["course_id", "end_date"],
        where: { user_id: id },
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
          if (completeCourses[j].course_id == (i+1)) {
            const date = completeCourses[j].end_date;
            const year = getYear(date);
            const month = getMonth(date);
            const day = getDay(date);

            afterCourses.push({
              id: courses[i+1].getId(),
              situation: 2,
              property: courses[i+1].getProperty(),
              title: courses[i+1].getTitle(),
              description: courses[i+1].getDescription(),
              totalDays: courses[i+1].getTotalDays(),
              year: year,
              month: month,
              date: day
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
            totalDays: courses[i].getTotalDays(),
            year: "",
            month: "",
            date: "",
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
};
