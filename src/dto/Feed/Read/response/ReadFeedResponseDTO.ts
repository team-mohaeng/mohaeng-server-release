export interface ReadFeedResponseDTO {
  status: number;
  data: FeedDTO[];
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
  myEmoji: string;
  isReport: boolean;
  isDelete: boolean;
}

export interface EmojiDTO {
  id: string;
  emojiCount: string;
}

