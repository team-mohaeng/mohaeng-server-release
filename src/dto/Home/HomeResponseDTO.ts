export default interface HomeResponseDTO {
  status: number;
  data: UserResponseDTO;
}

export interface UserResponseDTO {
  nickname: string;
  level: number;
  happy: number;
  fullHappy: number;
  characterLottie: string;
  characterSkin: string;
  isStyleNew: boolean;
  isBadgeNew: boolean;
  course: UserCourseResponseDTO;
}

export interface UserCourseResponseDTO {
  challengeTitle?: string;
  percent?: number;
}