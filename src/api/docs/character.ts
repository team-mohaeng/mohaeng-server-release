/**
 * @api {put} /api/character 캐릭터 변경
 * 
 * @apiVersion 1.0.0
 * @apiName setCharacter
 * @apiGroup 캐릭터
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "characterSkin": 3,
 *  "characterType": 1,
 *  "characterCard": 2
 * }
 * 
 * @apiSuccess {String} message 
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 캐릭터 변경
 * {
 *  "status": 200,
 *  "message": "캐릭터를 변경하였습니다." 
 * }
 * 
 * @apiErrorExample Error-Response:
 * 401 존재하지 않는 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 405 유저가 갖고 있지 않은 스킨인 경우
 * {
 *  "status": 405,
 *  "message": "유저가 갖고 있는 스킨이 아닙니다."
 * }
 * 
 * 405 유저가 갖고 있지 않은 캐릭터인 경우
 * {
 *  "status": 405,
 *  "message": "유저가 갖고 있는 캐릭터가 아닙니다."
 * }
 */