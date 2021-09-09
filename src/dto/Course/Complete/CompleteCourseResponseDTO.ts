export default interface CompleteCourseResponseDTO {
  status: number;
  data: WrapCompleteCourseResponseDTO;
}

export interface WrapCompleteCourseResponseDTO {
  courses: TotalCompleteCourseResponseDTO[];
}

export interface TotalCompleteCourseResponseDTO {
  id: number;
  situation: number;
  property: number;
  title: string;
  totalDays: number;
  year: string;
  month: string;
  date: string;
  challenges: TotalCompleteChallengeResponseDTO[];
}

export interface TotalCompleteChallengeResponseDTO {
  day: number;
  situation: number;
  title: string;
  year: string;
  month: string;
  date: string;
}