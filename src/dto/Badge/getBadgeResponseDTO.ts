export interface GetBadgeResponseDTO {
  status: number;
  data: BadgeResponseDTO;
}

export interface BadgeResponseDTO {
  badges: BadgeDTO[]
}

export interface BadgeDTO {
  id: number;
  name: string;
  info: string;
  image: string;
  hasBadge: boolean;
}