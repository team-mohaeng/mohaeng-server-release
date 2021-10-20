/**
 * @api {get} /api/message 푸시 알람 조회
 * 
 * @apiVersion 1.0.0
 * @apiName Chatting
 * @apiGroup 채팅
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 * }
 * 
 * @apiSuccess {String} profileImg 유저 캐릭터카드에 맞는 프로필 이미지
 * @apiSuccess {String} date 알람 받은 날짜
 * @apiSuccess {String[]} message 푸시 알람 멘트 배열
 * @apiSuccess {Boolean} isNew 유저가 확인했는지 여부
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 알람을 받지 않은 상태
 * {
 *  "status": 200,
 *  "data": {
 *    "profileImg": "profile.url",
 *    "messages": {
 *      "date": "2021-10-12T15:00:00.000Z",
 *      "message" : [],
 *      "isNew": false
 *    }
 *  }
 * }
 * 
 * 200 알람을 받은 상태
 * {
 *  "status": 200,
 *  "data": {
 *    "profileImg": "profile.url",
 *    "messages": {
 *      "date": "2021-10-12T15:00:00.000Z",
 *      "message" : [
 *        "모행, 오늘 어땠어?",
 *        "많이 힘들었구나...ㅜㅜ",
 *        "챌린지 인증하고 푹 자자!"
 *      ],
 *      "isNew": false
 *    }
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