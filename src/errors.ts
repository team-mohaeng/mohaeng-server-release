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
  message: "닉네임은 1-6글자 이내로 작성해주세요.",
};

export const sameNickname: IFail = {
  status: 412,
  message: "기존 닉네임과 다른 닉네임으로 설정해주세요.",
};

export const alreadyExistNickname: IFail = {
  status: 412,
  message: "이미 사용중인 닉네임입니다.",
};

export const alreadyExistEmail: IFail = {
  status: 412,
  message: "이미 사용중인 이메일입니다."
}

export const notExistUid: IFail = {
  status: 400,
  message: "계정 생성에 실패하였습니다."
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
  message: "이메일 계정 또는 비밀번호를 확인해주세요.",
};

export const invalidCourseChallengeId: IFail = {
  status: 400,
  message: "현재 진행 중인 코스 또는 챌린지가 아닙니다."
};

export const notExistCourseId: IFail = {
  status: 404,
  message: "해당 id의 코스가 존재하지 않습니다."
}

export const notExistChallengeId: IFail = {
  status: 404,
  message: "해당 id의 챌린지가 존재하지 않습니다."
};

export const notExistProgressCourse: IFail = {
  status: 404,
  message: "진행 중인 코스가 없습니다."
};

export const alreadyCompleteChallenge: IFail = {
  status: 409,
  message: "이미 인증이 완료되었습니다."
};

export const notExistFeedContent: IFail = {
  status: 412,
  message: "안부 내용을 작성해주세요."
}

export const feedLengthCheck: IFail = {
  status: 412,
  message: "피드 내용은 40자 이하로 작성해주세요."
}

export const notAuthorized: IFail = {
  status: 403,
  message: "작성자만 피드를 삭제할 수 있습니다."
}

export const notExsitFeed: IFail = {
  status: 405,
  message: "피드가 존재하지 않습니다."
}

export const wrongEmojiId: IFail = {
  status: 404,
  message: "잘못된 이모지 id입니다."
}

export const alreadyExsitEmoji: IFail = {
  status: 404,
  message: "이미 추가된 이모지입니다."
}

export const notExistEmoji: IFail = {
  status: 404,
  message: "추가된 이모지가 없습니다."
}

