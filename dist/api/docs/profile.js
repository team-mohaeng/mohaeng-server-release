/**
 * @api {put} /api/profile 닉네임 변경
 *
 * @apiVersion 1.0.0
 * @apiName changeNickname
 * @apiGroup 프로필
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "nickname": "시원뿡"
 * }
 *
 * @apiSuccess {String} message
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "닉네임을 변경했습니다."
 * }
 *
 * @apiErrorExample Error-Response:
 * 401 유효하지 않은 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
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
 * 404 이전과 같은 닉네임
 * {
 *  "status": 404,
 *  "message": "기존 닉네임과 다른 닉네임으로 설정해주세요."
 * }
 *
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */ 
//# sourceMappingURL=profile.js.map