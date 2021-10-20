export interface CommunityResponseDTO {
  status: number;
  data: CommunityDTO;
}

export interface CommunityDTO {
  isNew: boolean;
  hasFeed: number;
  userCount: number;
  feeds: FeedDTO[];
}

export interface FeedDTO {
  postId: string;
  course: string;
  challenge: number;
  image: string;
  mood: number,
  content: string;
  nickname: string;
  year: string;
  month: string;
  date: string;
  day: string;
  emoji: EmojiDTO[]
  myEmoji: number;
  isReport: boolean;
  isDelete: boolean;
}

export interface EmojiDTO {
  id: number;
  count: number;
}

