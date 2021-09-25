import { SERVER_ERROR_MESSAGE } from "../constant";
import { courses } from '../dummy/Course';
import { challengeBadges, challengeCountBadges, courseBadges } from '../dummy/Badge';
import { levels } from '../dummy/Level';
import { invalidCourseChallengeId, alreadyCompleteChallenge, notExistChallengeId, notExistCourseId, notExistProgressCourse, notExistUser } from "../errors";
import { getDay, getMonth, getYear } from '../formatter/mohaengDateFormatter';
import { IFail } from "../interfaces/IFail";
import { User } from '../models/User';
import { CompleteChallenge } from '../models/CompleteChallenge';
import TodayChallengeResponseDTO, { TodayChallengeDetailResponseDTO, TodayCourseDetailResponseDTO } from '../dto/Challenge/Today/TodayChallengeResponseDTO';
import CertificationChallengeResponseDTO, { CertificationChallengeCompletionResponseDTO, CertificationCourseCompletionResponseDTO, CertificationLevelUpResponseDTO } from '../dto/Challenge/Certification/CertificationChallengeResponseDTO';
import { ProgressChallenge } from '../models/ProgressChallenge';
import { BeforeChallenge } from '../models/BeforeChallenge';
import { CompleteCourse } from '../models/CompleteCourse';
import { Badge } from '../models/Badge';

export default {
  today: async (id: string) => {
    try {
      // 닉네임, 현재 진행 중인 코스 아이디, 현재 진행 중인 챌린지 아이디, 챌린지 수행 여부, 코스 변경 패널티 여부
      // 완료한 챌린지 개수, 연속 수행한 챌린지 개수, 현재 유저의 캐릭터 타입, 현재 유저의 캐릭터 카드
      const user = await User.findOne({
        attributes: ['nickname', 'current_course_id', 'current_challenge_id', 'is_completed', 
                    'complete_challenge_count', 'challenge_success_count', 'character_type', 'character_card'],
        where: { id: id }
      });

      // 유저가 없는 경우
      if (!user) {
        return notExistUser;
      }
      // 진행 중인 코스가 없는 경우
      if (user.current_course_id == null) {
        return notExistProgressCourse;
      }
      const courseId = user.current_course_id - 1;  // 코스 아이디 (인덱스 접근때문에 -1)
      const challengeId = user.current_challenge_id - 1;  // 챌린지 아이디 (인덱스 접근때문에 -1)

      // 완료한 챌린지 리스트를 challenge_id 기준으로 정렬해서 조회
      const completeChallenge = await CompleteChallenge.findAll({
        attributes: ['challenge_id', 'date'],
        where: { user_id: id },
        order: ['challenge_id']
      });

      // 현재 진행 중인 코스
      const course = courses[courseId];
      // 현재 코스의 챌린지들
      const challenges = course.getChallenges();
      let todayChallenges: TodayChallengeDetailResponseDTO[] = [];
      let completeCourse = false;

      if (challenges.length - 1 == challengeId) completeCourse = true;

      for (let i = 0; i < challenges.length; i++) {
        const challenge = challenges[i];  // 현재 체크중인 챌린지
        let situation = 0;
        let year = "";
        let month = "";
        let date = "";
        let badges: string[] = [];

        if (i < challengeId) {  // 완료한 챌린지
          situation = 2;

          // 챌린지를 완료한 날짜
          const completeDate = completeChallenge.find(e => e.challenge_id == (i + 1)).date;
          year = getYear(completeDate);
          month = getMonth(completeDate);
          date = getDay(completeDate);
        }
        // 진행 중인 챌린지
        else if (i == challengeId) {
          // 챌린지 수행 완료했다면
          if (user.is_completed) {
            situation = 2;

            // 챌린지를 완료한 날짜
            const completeDate = completeChallenge.find(e => e.challenge_id == (i+1)).date;
            year = getYear(completeDate);
            month = getMonth(completeDate);
            date = getDay(completeDate);
          }
          // 챌린지 수행 전이라면
          else {
            situation = 1;
          }

          // 코스 완료라면
          if (completeCourse) {
            let propertyCount = [0, 0, 0, 0, 0, 0, 0];
            const completeCourses = await CompleteCourse.findAll({
              where: { user_id: id }
            });

            // 유저가 완료한 코스 속성을 카운트
            // 현재 속성이 2개라면 3개 완료했으니까, 뱃지 부여
            for (let i = 0; i < completeCourses.length; i++) {
              propertyCount[courses[completeCourses[i].course_id - 1].getProperty() - 1]++;
            }

            const currentProperty = course.getProperty();
            if (propertyCount[currentProperty - 1] == 2) {  // 코스 뱃지를 얻을 수 있는 경우
              const courseBadge = courseBadges[currentProperty - 1];
              const badge = await Badge.findAll({
                where: {
                  id: courseBadge.getId(),
                  user_id: id
                }
              });
              console.log(badge);

              if (badge.length == 0) badges.push(courseBadge.getName());
            }
          }

          // 챌린지 수행 횟수 뱃지
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
            if (badge.length == 0) badges.push(challengeCountBadges[0].getName());
          }
        }
        // 진행 전인거는 따로 처리 필요 없음

        // 챌린지 멘트 부분에 ㅁㅁㅁ 부분에 유저 닉네임 적용
        todayChallenges.push({
          day: challenge.getDay(),
          situation: situation,
          title: challenge.getTitle(),
          happy: challenge.getHappy(),
          beforeMent: challenge.getBeforeMent().replace(/ㅁㅁㅁ/gi, user.nickname),
          afterMent: challenge.getAfterMent().replace(/ㅁㅁㅁ/gi, user.nickname),
          year: year,
          month: month,
          date: date,
          badges: badges
        });
      }

      // 코스 상태, 완료 날짜들
      let situation = 1;
      let year = "";
      let month = "";
      let date = "";

      // 마지막 챌린지를 완료했다면 (완료한 코스 조회의 경우)
      if (user.is_completed && challenges.length - 1 == challengeId) {
        situation = 2;
        // 현재 진행한 챌린지 날짜를 가져옴 (마지막 챌린지이기 때문에)
        const completeDate = completeChallenge.find(e => e.challenge_id == user.current_challenge_id).date;
        year = getYear(completeDate);
        month = getMonth(completeDate);
        date = getDay(completeDate);
      }

      /*
      캐릭터 분기처리 해야함
      */

      const todayCourse: TodayCourseDetailResponseDTO = {
        id: course.getId(),
        situation: situation,
        property: course.getProperty(),
        title: course.getTitle(),
        totalDays: course.getTotalDays(),
        currentDay: challenges[challengeId].getDay(),
        year: year,
        month: month,
        date: date,
        challenges: todayChallenges
      };

      const responseDTO: TodayChallengeResponseDTO = {
        status: 200,
        data: {
          isComplete: user.is_completed,
          isPenalty: user.challenge_penalty,
          mainCharacterImg: "",
          popupCharacterImg: "",
          course: todayCourse
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
  certification: async (id: string, courseId: string, challengeId: string) => {
    try {
      let user_id = Number(id);
      let course_id = Number(courseId);
      let challenge_id = Number(challengeId);

      // 코스 아이디나 챌린지 아이디가 유효하지 않은 경우
      if (courses.length < course_id) {
        return notExistCourseId;
      } else if (courses[course_id - 1].getChallenges().length < challenge_id) {
        return notExistChallengeId;
      }

      // 유저 현재 해피지수, 레벨, 현재 코스 아이디, 현재 챌린지 아이디, 챌린지 완료 여부, 완료한 코스 개수, 완료한 챌린지 개수, 보유한 뱃지 개수
      // 챌린지 패널티 여부, 최근 챌린지 완료 날짜, 챌린지 연속 수행 횟수
      const user = await User.findOne({
        attributes: ['affinity', 'level', 'current_course_id', 'current_challenge_id', 'is_completed', 'complete_course_count', 'complete_challenge_count', 'badge_count', 
          'challenge_penalty', 'recent_challenge_date', 'challenge_success_count'],
        where: { id: id }
      });

      // 유저가 없는 경우
      if (!user) {
        return notExistUser;
      }
      // 이미 유저가 챌린지를 인증한 경우
      if (user.is_completed) {
        return alreadyCompleteChallenge;
      }
      // 현재 진행 중인 코스나 챌린지가 아닐 때
      if (user.current_course_id != course_id || user.current_challenge_id != challenge_id) {
        return invalidCourseChallengeId;
      }

      const course = courses[course_id - 1];  // 현재 코스
      const challenge = course.getChallenges()[challenge_id - 1]; // 현재 완료한 챌린지

      let userHappy = user.affinity; // 유저에 업데이트될 해피지수
      let userLevel = user.level; // 유저에 업데이트될 레벨
      let levelUp = false;  // 레벨업 여부

      let completeCourse = false; // 챌린지 인증 시 코스 완료 여부
      let completeCourseCount = user.complete_course_count; // 완료한 코스 개수 -> 코스 완료라면 +1 처리
      const completeChallengeCount = user.complete_challenge_count + 1; // 완료한 챌린지 개수 -> +1 처리
      let challengeSuccessCount = user.challenge_success_count; // 챌린지 연속 수행 횟수

      let isBadgeNew = false; // 뱃지 부여 여부
      let badgeCount = user.badge_count;  // 유저가 소유한 뱃지 개수

      // 코스 완료라면
      if (course.getTotalDays() == challenge.getDay()) {
        completeCourse = true;  // 코스 완료 여부 true
        completeCourseCount++;  // 완료 코스 개수 +1
      }

      // 마지막 챌린지 성공이 아니라면 BeforeChallenge 에서 챌린지 삭제
      // ProgressChallenge에 다음 챌린지 삽입
      if (!completeCourse) {
        BeforeChallenge.destroy({
          where: { user_id: id }
        });
        ProgressChallenge.create({
          user_id: user_id,
          course_id: course_id,
          challenge_id: challenge_id + 1
        });
      }
      // 다음 챌린지가 마지막 챌린지가 아니라면 BeforeChallenge에 다다음 챌린지 삽입
      if (course.getTotalDays() > challenge.getDay() + 1) {
        BeforeChallenge.create({
          user_id: user_id,
          course_id: course_id,
          challenge_id: challenge_id + 2
        });
      }

      // 인증한 챌린지 삭제
      ProgressChallenge.destroy({
        where: {
          user_id: id,
          course_id: courseId,
          challenge_id: challengeId
        }
      });
      // 인증한 챌린지 완료한 챌린지에 삽입
      CompleteChallenge.create({
        user_id: Number(id),
        course_id: Number(courseId),
        challenge_id: Number(challengeId)
      });

      
      const today = new Date(); // 오늘
      let recentChallengeDate = new Date(); // DB에 저장된 최근 챌린지 완료 날짜 다음날
      recentChallengeDate = new Date(recentChallengeDate.setDate(user.recent_challenge_date.getDate() + 1));
      // 챌린지 연속 수행 여부
      if (getYear(today) == getYear(recentChallengeDate) && getMonth(today) == getMonth(recentChallengeDate) && getDay(today) == getDay(recentChallengeDate)) { // 연속 수행에 성공한 경우
        challengeSuccessCount++;
      } else {
        challengeSuccessCount = 1;
      }

      // 코스 완료라면 코스 뱃지를 얻을 수 있음
      if (completeCourse) {
        let propertyCount = [0, 0, 0, 0, 0, 0, 0];
        const completeCourses = await CompleteCourse.findAll({
          where: { user_id: id }
        });

        // 유저가 완료한 코스 속성을 카운트
        // 현재 속성이 2개라면 3개 완료했으니까, 뱃지 부여
        for (let i = 0; i < completeCourses.length; i++) {
          propertyCount[courses[completeCourses[i].course_id - 1].getProperty() - 1]++;
        }
        const currentProperty = course.getProperty();
        if (propertyCount[currentProperty - 1] == 2) {  // 코스 뱃지를 얻을 수 있는 경우
          isBadgeNew = true;  // 뱃지 부여 여부 true
          Badge.create({
            id: currentProperty,
            user_id: id
          });
          badgeCount++; // 뱃지 개수 +1
        }
      }
      
      // 챌린지 수행 횟수 뱃지
      // 받을 수 있다면, 뱃지 부여 여부 true & 뱃지 개수 +1
      if (completeChallengeCount == 3) {
        isBadgeNew = true;
        // 챌린지 한걸음
        Badge.create({
          id: 8,
          user_id: id
        });
        badgeCount++;
      }
      else if (completeChallengeCount == 21) {
        isBadgeNew = true;
        // 성장한 챌린저
        Badge.create({
          id: 9,
          user_id: id
        });
        badgeCount++;
      }
      else if (completeChallengeCount == 49) {
        isBadgeNew = true;
        // 챌린지 챔피언
        Badge.create({
          id: 10,
          user_id: id
        });
        badgeCount++;
      }

      // 패널티가 없는 경우만 해피지수를 얻을 수 있음
      if (!user.challenge_penalty) {
        userHappy += challenge.getHappy();  // 챌린지 해피지수
        if (completeCourse) userHappy += course.getHappy(); // 코스 해피지수

        // 현재 affinity에 userHappy를 더하면 레벨이 올라가는지 확인
        // 레벨업시 캐릭터 카드 부여 처리
        if (userHappy > levels[userLevel - 1].getFullHappy()) {
          levelUp = true;
          userHappy -= levels[userLevel - 1].getFullHappy();
          userLevel++;
        }
      }

      // 유저 정보 업데이트
      User.update(
        {
          affinity: userHappy,
          level: userLevel,
          is_completed: true,
          complete_course_count: completeCourseCount,
          complete_challenge_count: completeChallengeCount,
          badge_count: badgeCount,
          challenge_penalty: false,
          is_badge_new: isBadgeNew,
          is_style_new: levelUp,
          recent_challenge_date: today,
          challenge_success_count: challengeSuccessCount
        },
        { where: {id: id} }
      );
      
      // 챌린지는 항상 완료됨
      let challengeCompletionDTO: CertificationChallengeCompletionResponseDTO = {
        happy: challenge.getHappy(),
        fullHappy: levels[userLevel - 1].getFullHappy(),
        userHappy: userHappy,
        isPenalty: user.challenge_penalty
      };
      let courseCompletionDTO: CertificationCourseCompletionResponseDTO = {};
      let levelUpDTO: CertificationLevelUpResponseDTO = {};

      // 코스를 완료했다면
      if (completeCourse) {
        courseCompletionDTO = {
          property: course.getProperty(),
          title: course.getTitle(),
          happy: course.getHappy(),
          userHappy: userHappy
        };
      }
      // 레벨업을 했다면
      if (levelUp) {
        levelUpDTO = {
          level: userLevel,
          styleImg: ""
        };
      }

      const responseDTO: CertificationChallengeResponseDTO = {
        status: 200,
        data: {
          characterImg: "",
          challengeCompletion: challengeCompletionDTO,
          courseCompletion: courseCompletionDTO,
          levelUp: levelUpDTO
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