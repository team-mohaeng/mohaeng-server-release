export default interface MessageResponseDTO {
  status: number;
  data: {
    messages: UserMessageResponseDTO[];
  };
}

export interface UserMessageResponseDTO {
  date: Date;
  message: string[];
  isNew: boolean;
}