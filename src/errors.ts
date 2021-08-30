import { IFail } from "./interfaces/IFail";

export const notExistUser: IFail = {
  status: 401,
  message: "유저가 존재하지 않습니다.",
};

export const characterLengthCheck: IFail = {
  status: 400,
  message: "닉네임은 1~6글자 이내로 작성해주세요.",
};

export const sameNickname: IFail = {
  status: 403,
  message: "기존 닉네임과 다른 닉네임으로 설정해주세요.",
};

export const nicknameDuplication: IFail = {
  status: 403,
  message: "이미 사용중인 닉네임입니다.",
};