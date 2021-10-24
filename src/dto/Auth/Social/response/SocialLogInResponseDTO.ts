export interface SocialLogInResponseDTO {
	status: number;
  data: socialLogInDTO;
}

export interface socialLogInDTO {
  user: boolean;
  jwt?: string;
}