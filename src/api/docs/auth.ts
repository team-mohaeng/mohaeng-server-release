/**
 * @api {post} /api/signup 이메일 회원가입
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
 * @api {post} /api/signin 이메일 로그인
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
 * @api {post} /api/kakao 카카오 로그인
 * 
 * @apiVersion 1.0.0
 * @apiName kakaoLogin
 * @apiGroup 로그인/회원가입
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "idToken": "카카오 토큰"
 *  "token": "디바이스 토큰"
 * }
 * 
 * @apiSuccess {boolean} user
 * @apiSuccess {string} jwt
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 사용자 있을 경우
 * {
 *  "status": 200,
 *  "data": {
 *    "user": true,
 *    "jwt": "jwt"
 *  }
 * }
 * 
 * 200 OK 사용자 없을 경우
 * {
 *  "status": 200,
 *  "data": {
 *    "user": false,
 *    "jwt": ""
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
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
 */

/**
 * @api {post} /api/kakao/signup 카카오 회원가입
 * 
 * @apiVersion 1.0.0
 * @apiName kakaoSignUp
 * @apiGroup 로그인/회원가입
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "idToken": "카카오 토큰"
 *  "token": "디바이스 토큰"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "nickname": "시원뿡"
 * }
 * 
 * @apiSuccess {String} jwt
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "jwt": "jwt"
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
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
 * 404 닉네임 중복
 * {
 *  "status": 404,
 *  "message": "이미 사용중인 닉네임입니다."
 * }
 * 
 * 404 닉네임 글자 제한
 * {
 *  "status": 404,
 *  "message": "닉네임은 1-6글자 이내로 작성해주세요"
 * }
 * 
 * 404 이미 가입된 회원
 * {
 *  "status": 404,
 *  "message": "이미 가입된 회원입니다."
 * }
 */

/**
 * @api {post} /api/apple 애플 로그인
 * 
 * @apiVersion 1.0.0
 * @apiName appleLogIn
 * @apiGroup 로그인/회원가입
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "idToken": "애플 id 토큰"
 *  "token": "디바이스 토큰"
 * }
 * 
 * @apiSuccess {boolean} user
 * @apiSuccess {string} jwt
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 사용자 있을 경우
 * {
 *  "status": 200,
 *  "data": {
 *    "user": true,
 *    "jwt": "jwt 토큰"
 *  }
 * }
 * 
 * 200 OK 사용자 없을 경우
 * {
 *  "status": 200,
 *  "data": {
 *    "user": false,
 *    "jwt": ""
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
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
 */

/**
 * @api {post} /api/apple/signup 애플 회원가입
 * 
 * @apiVersion 1.0.0
 * @apiName appleSignUp
 * @apiGroup 로그인/회원가입
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "idToken": "애플 id 토큰"
 *  "token": "디바이스 토큰"
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
 * 404 닉네임 중복
 * {
 *  "status": 404,
 *  "message": "이미 사용중인 닉네임입니다."
 * }
 * 
 * 404 닉네임 글자 제한
 * {
 *  "status": 404,
 *  "message": "닉네임은 1-6글자 이내로 작성해주세요"
 * }
 * 
 * 404 이미 가입된 회원
 * {
 *  "status": 404,
 *  "message": "이미 가입된 회원입니다."
 * }
 */

/**
 * @api {post} /api/google 구글 로그인
 * 
 * @apiVersion 1.0.0
 * @apiName googleLogIn
 * @apiGroup 로그인/회원가입
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "idToken": "구글 id 토큰"
 *  "token": "디바이스 토큰"
 * }
 * 
 * @apiSuccess {boolean} user
 * @apiSuccess {string} jwt
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 사용자 있을 경우
 * {
 *  "status": 200,
 *  "data": {
 *    "user": true,
 *    "jwt": "jwt 토큰"
 *  }
 * }
 * 
 * 200 OK 사용자 없을 경우
 * {
 *  "status": 200,
 *  "data": {
 *    "user": false,
 *    "jwt": ""
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
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
 */

/**
 * @api {post} /api/google/signup 구글 회원가입
 * 
 * @apiVersion 1.0.0
 * @apiName googleSignUp
 * @apiGroup 로그인/회원가입
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "idToken": "구글 id 토큰"
 *  "token": "디바이스 토큰"
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
 * 404 닉네임 중복
 * {
 *  "status": 404,
 *  "message": "이미 사용중인 닉네임입니다."
 * }
 * 
 * 404 닉네임 글자 제한
 * {
 *  "status": 404,
 *  "message": "닉네임은 1-6글자 이내로 작성해주세요"
 * }
 * 
 * 404 이미 가입된 회원
 * {
 *  "status": 404,
 *  "message": "이미 가입된 회원입니다."
 * }
 */

/**
 * @api {get} /api/password/:email 비밀번호 인증코드 보내기
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