/**
 * @api {get} /api/home 홈 조회
 *
 * @apiVersion 1.0.0
 * @apiName Home
 * @apiGroup 홈
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 * }
 *
 * @apiSuccess {String} nickname 유저 닉네임
 * @apiSuccess {Number} level 유저 레벨
 * @apiSuccess {Number} happy 현재 유저 해피 지수
 * @apiSuccess {Number} fullHappy 현재 레벨에서 채워야 할 max 해피지수
 * @apiSuccess {String} characterLottie 유저 캐릭터/카드에 맞는 로티 url
 * @apiSuccess {String} characterSkin 유저 캐릭터 스킨 이미지 url
 * @apiSuccess {Boolean} isStyleNew 새로운 스타일을 받았는지 여부
 * @apiSuccess {Boolean} isBadgeNew 새로운 뱃지를 받았는지 여부
 * @apiSuccess {String} challengeTitle 현재 진행하고 있는 챌린지 제목
 * @apiSuccess {Number} percent 코스 진행 현황 퍼센트
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 코스 진행 전
 * {
 *  "status": 200,
 *  "data": {
 *    "nicknema": "모행",
 *    "level": 15,
 *    "happy": 24,
 *    "fullHappy": 90,
 *    "characterLottie": "bear.url",
 *    "characterSkin": "image.url",
 *    "isStyleNew": false,
 *    "isBadgeNew": false,
 *    "course": {},
 *  }
 * }
 *
 * 200 코스 진행 중
 * {
 *  "status": 200,
 *  "data": {
 *    "nicknema": "모행",
 *    "level": 15,
 *    "happy": 24,
 *    "fullHappy": 90,
 *    "characterLottie": "bear.url",
 *    "characterSkin": "image.url",
 *    "isStyleNew": false,
 *    "isBadgeNew": false,
 *    "course": {
 *      "challengeTitle": "하늘 사진 찍기",
 *      "percent": 14,
 *    },
 *  }
 * }
 *
 * @apiErrorExample Error-Response:
 * 401 존재하지 않는 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
 * }
 */ 
//# sourceMappingURL=home.js.map