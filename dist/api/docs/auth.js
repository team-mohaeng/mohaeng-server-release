/**
 * @api {post} /api/signup 회원가입
 *
 * @apiVersion 1.0.0
 * @apiName signup
 * @apiGroup 로그인/회원가입
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "token": "fcm token"
 * }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "mohaeng_official@naver.com"
 *  "password": "mohaengmohaeng"
 *  "nickname": "모행"
 * }
 *
 * @apiSuccess {string} jwt
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "jwt": "jwt 토큰"
 *  }
 * }
 *
 * @apiErrorExample Error-Response:
 * 404 잘못된 이메일 형식
 * {
 *  "status": 404,
 *  "message": "이메일 형식이 올바르지 않습니다."
 * }
 *
 * 404 닉네임 글자 제한
 * {
 *  "status": 404,
 *  "message": "닉네임은 1-6글자 이내로 작성해주세요"
 * }
 *
 * 404 닉네임 중복
 * {
 *  "status": 404,
 *  "message": "이미 사용 중인 닉네임입니다."
 * }
 *
 * 404 비밀번호 영문, 숫자 미포함
 * {
 *  "status": 404,
 *  "message": "영문, 숫자를 모두 포함하여 입력해주세요."
 * }
 *
 * 404 비밀번호 글자수 제한
 * {
 *  "status": 404,
 *  "message": "8-16자의 비밀번호를 입력해주세요."
 * }
 *
 * 403 토큰 누락
 * {
 *  "status": 403,
 *  "message": "토큰이 없습니다. 토큰을 함께 보내주세요."
 * }
 *
 * 403 토큰 유효성 검증 실패
 * {
 *  "status": 403,
 *  "message": "유효성 인증에 실패하였습니다."
 * }
 *
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */
/**
 * @api {post} /api/signin 로그인
 *
 * @apiVersion 1.0.0
 * @apiName signin
 * @apiGroup 로그인/회원가입
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "token": "fcm token"
 * }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "mohaeng_official@naver.com"
 *  "password": "mohaengmohaeng"
 * }
 *
 * @apiSuccess {string} jwt
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "jwt": "jwt 토큰"
 *  }
 * }
 *
 * @apiErrorExample Error-Response:
 * 404 잘못된 이메일 형식
 * {
 *  "status": 404,
 *  "message": "이메일 형식이 올바르지 않습니다."
 * }
 *
 * 403 토큰 누락
 * {
 *  "status": 403,
 *  "message": "토큰이 없습니다. 토큰을 함께 보내주세요."
 * }
 *
 * 403 토큰 유효성 검증 실패
 * {
 *  "status": 403,
 *  "message": "유효성 인증에 실패하였습니다."
 * }
 *
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */
/**
 * @api {get} /api/kakao 카카오 로그인
 *
 * @apiVersion 1.0.0
 * @apiName kakaoLogin
 * @apiGroup 로그인/회원가입
 *
 * @apiSuccess {String} message
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "토큰 인증을 완료하였습니다."
 * }
 *
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */
/**
 * @api {post} /api/nickname 소셜로그인 회원가입
 *
 * @apiVersion 1.0.0
 * @apiName createUser
 * @apiGroup 로그인/회원가입
 *
 * * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "token": "token"
 * }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "nickname": "시원뿡"
 * }
 *
 * @apiSuccess {string} jwt
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "jwt": "jwt 토큰"
 *  }
 * }
 *
 * @apiErrorExample Error-Response:
 *
 * 404 닉네임 글자 제한
 * {
 *  "status": 404,
 *  "message": "닉네임은 1-6글자 이내로 작성해주세요"
 * }
 *
 * 404 닉네임 중복
 * {
 *  "status": 404,
 *  "message": "이미 사용 중인 닉네임입니다."
 * }
 *
 * 403 토큰 누락
 * {
 *  "status": 403,
 *  "message": "토큰이 없습니다. 토큰을 함께 보내주세요."
 * }
 *
 * 403 토큰 유효성 검증 실패
 * {
 *  "status": 403,
 *  "message": "유효성 인증에 실패하였습니다."
 * }
 *
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */
/**
 * @api {get} /api/password/:email 인증코드 보내기
 *
 * @apiVersion 1.0.0
 * @apiName sendCode
 * @apiGroup 로그인/회원가입
 *
 * * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 *
 * @apiSuccess {number} number
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "number": "인증코드숫자"
 *  }
 * }
 *
 * @apiErrorExample Error-Response:
 * 401 유효하지 않은 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
 * }
 *
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */
/**
 * @api {put} /api/password 비밀번호 변경
 *
 * @apiVersion 1.0.0
 * @apiName changePassword
 * @apiGroup 로그인/회원가입
 *
 * * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "mohaeng@naver.com"
 *  "password": "mohaeng1234"
 * }
 *
 * @apiSuccess {string} message
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "비밀번호 바꾸기를 성공하였습니다."
 * }
 *
 * @apiErrorExample Error-Response:
 * 401 유효하지 않은 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
 * }
 *
 * 404 잘못된 이메일 형식
 * {
 *  "status": 404,
 *  "message": "이메일 형식이 올바르지 않습니다."
 * }
 *
 * 404 비밀번호 영문, 숫자 미포함
 * {
 *  "status": 404,
 *  "message": "영문, 숫자를 모두 포함하여 입력해주세요."
 * }
 *
 * 404 비밀번호 글자수 제한
 * {
 *  "status": 404,
 *  "message": "8-16자의 비밀번호를 입력해주세요."
 * }
 *
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */
/**
 * @api {delete} /api/delete 회원탈퇴
 *
 * @apiVersion 1.0.0
 * @apiName deleteAccount
 * @apiGroup 로그인/회원가입
 *
 * * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 *
 * @apiSuccess {string} message
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "계정을 삭제하였습니다."
 * }
 *
 * @apiErrorExample Error-Response:
 * 401 유효하지 않은 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
 * }
 *
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */ 
//# sourceMappingURL=auth.js.map