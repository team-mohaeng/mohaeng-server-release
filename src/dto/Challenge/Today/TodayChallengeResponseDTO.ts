export default interface TodayChallengeResponseDTO {
  status: number;
  data: TotalTodayChallengeResponseDTO;
}

export interface TotalTodayChallengeResponseDTO {
  isComplete: boolean;
  isPenalty: boolean;
  mainCharacterImg: string;
  popupCharacterImg: string;
  course: TodayCourseDetailResponseDTO;
}

export interface TodayCourseDetailResponseDTO {
  id: number;
  situation: number;
  property: number;
  title: string;
  totalDays: number;
  currentDay: number;
  year: string;
  month: string;
  date: string;
  challenges: TodayChallengeDetailResponseDTO[];
}

export interface TodayChallengeDetailResponseDTO {
  day: number;
  situation: number;
  title: string;
  happy: number;
  beforeMent: string;
  afterMent: string;
  year: string;
  month: string;
  date: string;
  badges: string[];
}