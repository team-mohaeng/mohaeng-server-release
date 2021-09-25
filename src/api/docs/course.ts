/**
 * @api {get} /api/courses 코스 목록 조회
 * 
 * @apiVersion 1.0.0
 * @apiName Library
 * @apiGroup 코스
 * 
 * @apiHeaderExample {json}
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 * }
 * 
 * @apiSuccess {Boolean} isProgress 유저가 현재 진행하고 있는 코스가 존재하는지 여부
 * @apiSuccess {Object[]} courses 코스 목록들. 진행하지 않은 코스 -> 완료한 코스 순서로 보냄
 * @apiSuccess {Number} id 코스 아이디
 * @apiSuccess {Number} situation 코스 진행 상태 (0: 진행 전, 2: 완료)
 * @apiSuccess {Number} property 코스 속성 (1 ~ 7 -> 자세한 목록은 추후 슬랙에 공지)
 * @apiSuccess {String} title 코스 제목
 * @apiSuccess {String} description 코스 설명
 * @apiSuccess {Number} totalDays 코스 총 날짜 수
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200
 * {
 *  "status": 200,
 *  "data": {
 *    "isProgress": true,
 *    "courses": [
 *      {
 *        "id": 1,
 *        "situation": 0,
 *        "property": 1,
 *        "title": "초보 사진가",
 *        "description": "초보 사진가 설명",
 *        "totalDays": 7
 *      },
 *      // ...
 *      {
 *        "id": 7,
 *        "situation": 2,
 *        "property": 3,
 *        "title": "나 돌아갈래",
 *        "description": "나 돌아갈래 설명",
 *        "totalDays": 7
 *      },
 *      // ...
 *    ]
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