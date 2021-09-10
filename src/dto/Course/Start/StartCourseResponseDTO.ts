export default interface StartCourseResponseDTO {
  status: number;
  data: TotalStartCourseResponseDTO;
}

export interface TotalStartCourseResponseDTO {
  isComplete: boolean;
  isPenalty: boolean;
  mainCharacterImg: string;
  popupCharacterImg: string;
  course: StartCourseDetailResponseDTO;
}

export interface StartCourseDetailResponseDTO {
  id: number;
  situation: number;
  property: number;
  title: string;
  totalDays: number;
  currentDay: number;
  year: string;
  month: string;
  date: string;
  challenges: StartChallengeDetailResponseDTO[];
}

export interface StartChallengeDetailResponseDTO {
  day: number;
  situation: number;
  title: string;
  happy: number;
  beforeMent: string;
  afterMent: string;
  year: string;
  month: string;
  date: string;
  badge: string;
}