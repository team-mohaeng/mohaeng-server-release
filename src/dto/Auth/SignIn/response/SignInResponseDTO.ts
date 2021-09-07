export interface SignInResponseDTO {
	status: number;
  data: {
    jwt: string;
  } 
}