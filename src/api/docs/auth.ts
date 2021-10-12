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