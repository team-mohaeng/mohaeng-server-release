export default interface MessageResponseDTO {
  status: number;
  data: {
    profileImg: string;
    messages: UserMessageResponseDTO[];
  };
}

export interface UserMessageResponseDTO {
  date: Date;
  message: string[];
  isNew: boolean;
}