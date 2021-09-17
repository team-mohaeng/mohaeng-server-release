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
  level: number;
  characterType: number;
  characterCard: CharacterCardResponseDTO[]
}

export interface CharacterCardResponseDTO {
  id: number;
  image: string;
}