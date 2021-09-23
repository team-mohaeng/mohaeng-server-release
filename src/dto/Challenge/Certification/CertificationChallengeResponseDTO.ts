export default interface CertificationChallengeResponseDTO {
  status: number;
  data: CertificationDetailResponseDTO;
}

export interface CertificationDetailResponseDTO {
  characterImg: string;
  challengeCompletion: CertificationChallengeCompletionResponseDTO;
  courseCompletion: CertificationCourseCompletionResponseDTO;
  levelUp: CertificationLevelUpResponseDTO;
}

export interface CertificationChallengeCompletionResponseDTO {
  happy: number;
  fullHappy: number;
  userHappy: number;
  isPenalty: boolean;
}

export interface CertificationCourseCompletionResponseDTO {
  property?: number;
  title?: string;
  happy?: number;
  userHappy?: number;
}

export interface CertificationLevelUpResponseDTO {
  level?: number;
  styleImg?: string;
}