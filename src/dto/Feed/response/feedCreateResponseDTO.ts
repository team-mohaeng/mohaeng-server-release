export interface feedCreateResponseDTO {
  status: number;
  data: feedResponseDTO;
}

export interface feedResponseDTO {
  happy: number;
  userHappy: number;
  totalHappy: number;
  isPenalty: boolean;
  levelUp: levelUpResponseDTO;
}

export interface levelUpResponseDTO {
  level: number;
  characterType: number;
  characterCard: characterCardResponseDTO[]
}

export interface characterCardResponseDTO {
  id: number;
  image: string;
}