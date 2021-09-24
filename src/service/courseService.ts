import { SERVER_ERROR_MESSAGE } from "../constant";
import CompleteCourseResponseDTO, { TotalCompleteChallengeResponseDTO, TotalCompleteCourseResponseDTO, WrapCompleteCourseResponseDTO } from '../dto/Course/Complete/CompleteCourseResponseDTO';
import CourseLibraryResponseDTO, { SimpleCourseResponseDTO } from '../dto/Course/Library/CourseLibraryResponseDTO';
import StartCourseResponseDTO, { StartChallengeDetailResponseDTO, StartCourseDetailResponseDTO } from '../dto/Course/Start/StartCourseResponseDTO';
import { courses } from '../dummy/Course';
import { challengeBadges, challengeCountBadges } from '../dummy/Badge';
import { notExistCourseId, notExistUser } from "../errors";
import { getDay, getMonth, getYear } from '../formatter/mohaengDateFormatter';
import { IFail } from "../interfaces/IFail";
import { BeforeChallenge } from '../models/BeforeChallenge';
import { CompleteChallenge } from '../models/CompleteChallenge';
import { CompleteCourse } from "../models/CompleteCourse";
import { ProgressChallenge } from '../models/ProgressChallenge';
import { User } from "../models/User";
import { Badge } from "../models/Badge";

export default {
  library: async (id: string) => {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        return notExistUser;
      }

      const currentCourseId = user.current_course_id;
      const isProgress = currentCourseId != null ? true : false;

      const completeCourses = await CompleteCourse.findAll({
        attributes: ["course_id"],
        group: ["user_id", "course_id"],
        where: { user_id: id },
        order: ["course_id"]
      });

      let beforeCourses: SimpleCourseResponseDTO[] = [];
      let afterCourses: SimpleCourseResponseDTO[] = [];

      for (let i = 0; i < courses.length; ++i) {
        let flag = false;
        if (isProgress && (i+1) == currentCourseId) {
          continue; // 현재 진행 중인 코스면 skip
        }

        let course = courses[i];
        
        // 완료한 코스일 경우
        for (let j = 0; j < completeCourses.length; ++j) {
          if (completeCourses[j].course_id == course.getId()) {
            afterCourses.push({
              id: course.getId(),
              situation: 2,
              property: course.getProperty(),
              title: course.getTitle(),
              description: course.getDescription(),
              totalDays: course.getTotalDays()
            });
            flag = true;
            break;
          }
        }

        // 진행 전인 코스일 경우
        if (!flag) {
          beforeCourses.push({
            id: course.getId(),
            situation: 0,
            property: course.getProperty(),
            title: course.getTitle(),
            description: course.getDescription(),
            totalDays: course.getTotalDays()
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
  complete: async (id: string) => {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        return notExistUser;
      }

      const completeCourses = await CompleteCourse.findAll({ where: { user_id: id } });
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
  start: async (id: string, courseId: string) => {
    try {
      let user = await User.findOne({
        attributes: ['nickname', 'current_course_id', 'current_challenge_id', 'is_completed', 'complete_challenge_count', 'challenge_success_count'],
        where: { id: id }
      });

      if (!user) {
        return notExistUser;
      }

      const cid = Number(courseId) - 1;
      if ((cid + 1) > courses.length || (cid+1) < 0) {
        return notExistCourseId;
      }

      let challenges = courses[cid].getChallenges();
      let isPenalty = false;
      // 코스 변경인 경우
      if (user.current_course_id != null && user.current_challenge_id != null) {
        // 패널티 부여
        isPenalty = true;
        // 챌린지 삭제
        BeforeChallenge.destroy(
          { where: { user_id: id } }
        );
        ProgressChallenge.destroy(
          { where: { user_id: id } }
        );
        CompleteChallenge.destroy(
          { where: { user_id: id } }
        );
      }

      // 코스 진행하기
      User.update(
        {
          current_course_id: cid+1,
          current_challenge_id: 1,
          is_completed: false,
          challenge_penalty: isPenalty,
        },
        { where: { id: id } }
      );
      ProgressChallenge.create(
        {
          user_id: Number(id),
          course_id: cid + 1,
          challenge_id: 1
        }
      );
      BeforeChallenge.create(
        {
          user_id: Number(id),
          course_id: cid + 1,
          challenge_id: 2
        }
      );

      let startChallenges: StartChallengeDetailResponseDTO[] = [];
      for (let i = 0; i < challenges.length; i++) {
        let situation = 0;
        let challenge = challenges[i];
        let badges: string[] = [];

        if (i == 0) {
          situation = 1;

          // 진행할 챌린지에 대해서 뱃지 조건
          if (user.complete_challenge_count + 1 == 3) {
            badges.push(challengeBadges[0].getName());
          } else if (user.complete_challenge_count + 1 == 21) {
            badges.push(challengeBadges[1].getName());
          } else if (user.complete_challenge_count + 1 == 49) {
            badges.push(challengeBadges[2].getName());
          }

          // 챌린지 연속 21일 수행
          if (user.challenge_success_count + 1 == 21) {
            // 뱃지를 소유하고있지 않을 경우에만 부여
            const badge = await Badge.findAll({
              where: {
                id: challengeCountBadges[0].getId(),
                user_id: id
              }
            });
            if (!badge) badges.push(challengeCountBadges[0].getName());
          }
        }
        // 챌린지 멘트 부분에 ㅁㅁㅁ 부분에 유저 닉네임 적용
        startChallenges.push({
          day: challenge.getDay(),
          situation: situation,
          title: challenge.getTitle(),
          happy: challenge.getHappy(),
          beforeMent: challenge.getBeforeMent().replace(/ㅁㅁㅁ/gi, user.nickname),
          afterMent: challenge.getAfterMent().replace(/ㅁㅁㅁ/gi, user.nickname),
          year: "",
          month: "",
          date: "",
          badges: badges
        });
      }

      let course = courses[cid];
      const startCourse: StartCourseDetailResponseDTO = {
        id: course.getId(),
        situation: 1,
        property: course.getProperty(),
        title: course.getTitle(),
        totalDays: course.getTotalDays(),
        currentDay: 1,
        year: "",
        month: "",
        date: "",
        challenges: startChallenges
      };

      user = await User.findOne({
        attributes: ['challenge_penalty'],
        where: { id: id }
      });

      const responseDTO: StartCourseResponseDTO = {
        status: 200,
        data: {
          isComplete: false,
          isPenalty: isPenalty,
          mainCharacterImg: "",
          popupCharacterImg: "",
          course: startCourse
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
};
