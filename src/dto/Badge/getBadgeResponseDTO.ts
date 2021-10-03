export interface GetBadgeResponseDTO {
  status: number;
  badges: BadgeResponseDTO[];
}

export interface BadgeResponseDTO {
  id: number;
  name: string;
  info: string;
  image: string;
  hasBadge: boolean;
}