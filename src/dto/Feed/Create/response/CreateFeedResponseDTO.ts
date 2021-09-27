import { toUnicode } from "punycode";

export interface CreateFeedResponseDTO {
  status: number;
  data: FeedResponseDTO;
}

export interface FeedResponseDTO {
  happy: number;
  userHappy: number;
  totalHappy: number;
  isPenalty: boolean;
  levelUp: LevelUpResponseDTO;
}

export interface LevelUpResponseDTO {
  level?: number;
  styleImg?: string;
}
