export default interface HomeResponseDTO {
  status: number;
  data: UserResponseDTO;
}

export interface UserResponseDTO {
  nickname: string;
  level: number;
  happy: number;
  fullHappy: number;
  characterSkin: string;
  isNew: boolean;
  course: UserCourseResponseDTO;
}

export interface UserCourseResponseDTO {
  challengeTitle?: string;
  percent?: number;
}