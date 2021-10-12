/**
 * @api {put} /api/badge 달성한 뱃지 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getBadge
 * @apiGroup 뱃지
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 *
 * @apiSuccess {Object[]} badges
 * 하단부터 Object 정보
 * @apiSuccess {number} id
 * @apiSuccess {string} name 
 * @apiSuccess {string} info 
 * @apiSuccess {string} image
 * @apiSuccess {boolean} hasBadge  
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 달성한 뱃지 조회 성공
 * {
 *  "status": 200,
 *  "data": {
 *    "badges": [
 *    {
 *      "id": 1,
 *      "name": "내 건강 챙기미",
 *      "info": "건강 코스 3개",
 *      "image": "imageUrl",
 *      "hasBadge": false
 *    },
 *    {
 *      "id": 2,
 *      "name": "아이마이미마인",
 *      "info": "",
 *      "image": "imageUrl",
 *      "hasBadge": true
 *    },
 *    {
 *      "id": 3,
 *      "name": "바른생활 모범생",
 *      "info": "생활습관 코스 3개",
 *      "image": "imageUrl",
 *      "hasBadge": false
 *    }
 *   ...
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