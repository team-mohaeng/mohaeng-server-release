export interface SignUpResponseDTO {
	status: number;
  data: {
    jwt: string;
  }
}