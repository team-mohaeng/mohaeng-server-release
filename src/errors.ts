import { IFail } from "./interfaces/IFail";
import { SERVER_ERROR_MESSAGE, TOKEN_ERROR_MESSAGE } from "./constant";

export const serverError: IFail = {
  status: 500,
  message: SERVER_ERROR_MESSAGE
}

export const notExistUser: IFail = {
  status: 401,
  message: "유저가 존재하지 않습니다.",
};

export const nicknameLengthCheck: IFail = {
  status: 412,
  message: "닉네임은 1~6글자 이내로 작성해주세요",
};

export const sameNickname: IFail = {
  status: 412,
  message: "기존 닉네임과 다른 닉네임으로 설정해주세요",
};

export const alreadyExistNickname: IFail = {
  status: 412,
  message: "이미 사용중인 닉네임입니다",
};

export const alreadyExistEmail: IFail = {
  status: 412,
  message: "중복된 이메일입니다"
}

export const notExistToken: IFail = {
  status: 400,
  message: "토큰 생성에 실패하였습니다."
}

export const notGetToken: IFail = {
  status: 403,
  message: "토큰이 없습니다. 토큰을 함께 보내주세요."
}

export const expiredToken: IFail = {
  status: 403,
  message: TOKEN_ERROR_MESSAGE
}

export const notMatchSignIn: IFail = {
  status: 401,
  message: "이메일 계정 또는 비밀번호를 확인해주세요",
};
