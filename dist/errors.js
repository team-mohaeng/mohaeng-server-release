"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alreadySignedUp = exports.invalidClient = exports.invalidEmail = exports.invalidReport = exports.alreadyReported = exports.notExistCharacter = exports.notExistSkin = exports.notExistEmoji = exports.alreadyExsitEmoji = exports.wrongEmojiId = exports.notExistFeed = exports.notAuthorized = exports.feedLengthCheck = exports.notExistFeedContent = exports.alreadyCompleteChallenge = exports.notExistProgressCourse = exports.notExistChallengeId = exports.notExistCourseId = exports.invalidCourseChallengeId = exports.notMatchSignIn = exports.invalidToken = exports.notExistToken = exports.notExistUid = exports.alreadyExistEmail = exports.alreadyExistNickname = exports.sameNickname = exports.nicknameLengthCheck = exports.notExistUser = exports.serverError = void 0;
const constant_1 = require("./constant");
exports.serverError = {
    status: 500,
    message: constant_1.SERVER_ERROR_MESSAGE
};
exports.notExistUser = {
    status: 404,
    message: "유저가 존재하지 않습니다.",
};
exports.nicknameLengthCheck = {
    status: 404,
    message: "닉네임은 1~6글자 이내로 작성해주세요",
};
exports.sameNickname = {
    status: 404,
    message: "기존 닉네임과 다른 닉네임으로 설정해주세요",
};
exports.alreadyExistNickname = {
    status: 404,
    message: "이미 사용중인 닉네임입니다",
};
exports.alreadyExistEmail = {
    status: 404,
    message: "중복된 이메일입니다"
};
exports.notExistUid = {
    status: 400,
    message: "계정 생성에 실패하였습니다."
};
exports.notExistToken = {
    status: 403,
    message: "토큰이 없습니다. 토큰을 함께 보내주세요."
};
exports.invalidToken = {
    status: 403,
    message: "유효성 인증에 실패하였습니다."
};
exports.notMatchSignIn = {
    status: 401,
    message: "이메일 계정 또는 비밀번호를 확인해주세요.",
};
exports.invalidCourseChallengeId = {
    status: 400,
    message: "현재 진행 중인 코스 또는 챌린지가 아닙니다."
};
exports.notExistCourseId = {
    status: 404,
    message: "해당 id의 코스가 존재하지 않습니다."
};
exports.notExistChallengeId = {
    status: 404,
    message: "해당 id의 챌린지가 존재하지 않습니다."
};
exports.notExistProgressCourse = {
    status: 404,
    message: "진행 중인 코스가 없습니다."
};
exports.alreadyCompleteChallenge = {
    status: 409,
    message: "이미 인증이 완료되었습니다."
};
exports.notExistFeedContent = {
    status: 404,
    message: "안부 내용을 작성해주세요."
};
exports.feedLengthCheck = {
    status: 404,
    message: "안부 내용은 40자 이하로 작성해주세요."
};
exports.notAuthorized = {
    status: 403,
    message: "작성자만 안부를 삭제할 수 있습니다."
};
exports.notExistFeed = {
    status: 404,
    message: "안부가 존재하지 않습니다."
};
exports.wrongEmojiId = {
    status: 404,
    message: "잘못된 이모지 id입니다."
};
exports.alreadyExsitEmoji = {
    status: 404,
    message: "이미 추가된 이모지입니다."
};
exports.notExistEmoji = {
    status: 404,
    message: "안부에 붙여진 이모지가 아닙니다."
};
exports.notExistSkin = {
    status: 404,
    message: "유저가 갖고 있는 스킨이 아닙니다."
};
exports.notExistCharacter = {
    status: 404,
    message: "유저가 갖고 있는 캐릭터가 아닙니다."
};
exports.alreadyReported = {
    status: 404,
    message: "이미 신고한 안부입니다."
};
exports.invalidReport = {
    status: 404,
    message: "본인이 작성한 안부는 신고할 수 없습니다."
};
exports.invalidEmail = {
    status: 404,
    message: "유효하지 않은 이메일입니다."
};
exports.invalidClient = {
    status: 400,
    message: "헤더를 확인해주세요."
};
exports.alreadySignedUp = {
    status: 404,
    message: "이미 가입된 회원입니다."
};
//# sourceMappingURL=errors.js.map