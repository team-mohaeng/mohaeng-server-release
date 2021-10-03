export interface MyPageResponseDTO {
  status: number;
  data: MyPageDTO;
}

export interface MyPageDTO {
  nickname: string;
  email: string;
  completeCourseCount: number;
  completeChallengeCount: number;
  feedCount: number;
  badgeCount: number;
  calendar: CalendarDTO[]
}

export interface CalendarDTO {
  property: number;
  date: string;
}