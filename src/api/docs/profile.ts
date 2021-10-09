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

/**
 * @api {get} /api/profile 마이페이지 조회
 * 
 * @apiVersion 1.0.0
 * @apiName myPage
 * @apiGroup 프로필
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 *
 * @apiSuccess {String} nickname
 * @apiSuccess {String} email
 * @apiSuccess {Number} completeCourseCount
 * @apiSuccess {Number} completeChallengeCount
 * @apiSuccess {Number} feedCount
 * @apiSuccess {Number} badgeCount
 * @apiSuccess {Object[]} calendar
 * //하단부터 Object 속성
 * @apiSuccess {Number} property
 * @apiSuccess {String[]} date
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "nickname": "모행",
 *    "email": "mohaeng@gmail.com",
 *    "completeCourseCount": 2,
 *    "completeChallengeCount": 31,
 *    "feedCount": 0,
 *    "badgeCount": 2,
 *    "calendar": [
 *      {
 *        "property": 1,
 *        "date": [
 *          "2021-09-14",
 *          "2021-09-16",
 *          "2021-09-17"
 *        ]
 *      },
 *      {
 *        "property": 1,
 *        "date": [
 *          "2021-09-23",
 *          "2021-09-25",
 *          "2021-09-30"
 *        ]
 *      },
 *    ]
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