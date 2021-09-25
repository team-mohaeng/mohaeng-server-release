/**
 * @api {get} /api/courses 코스 목록 조회
 * 
 * @apiVersion 1.0.0
 * @apiName Library
 * @apiGroup 코스
 * 
 * @apiHeaderExample {json} Header-Example:
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
 * 200 코스 목록 조회 성공
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

/**
 * @api {get} api/courses/complete 완료한 코스 목록 조회
 * 
 * @apiVersion 1.0.0
 * @apiName Complete
 * @apiGroup 코스
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 * }
 * 
 * @apiSuccess {Object[]} courses 완료한 코스 목록
 * @apiSuccess {Number} id 코스 인덱싱 아이디 (코스 고유 아이디 아님)
 * @apiSuccess {Number} situation 코스 진행 상태 (항상 완료 상태인 2)
 * @apiSuccess {Number} property 코스 속성 (1 ~ 7 -> 자세한 목록은 추후 슬랙에 공지)
 * @apiSuccess {String} title 코스 제목
 * @apiSuccess {String} description 코스 설명
 * @apiSuccess {Number} totalDays 코스 총 날짜 수
 * @apiSuccess {String} year 코스를 완료한 년도
 * @apiSuccess {String} month 코스를 완료한 월
 * @apiSuccess {String} date 코스를 완료한 일
 * @apiSuccess {Object[]} challenges 해당 코스의 챌린지 목록
 * @apiSuccess {Number} day 챌린지 날짜
 * @apiSuccess {Number} situation 코스 진행 상태 (항상 완료 상태인 2)
 * @apiSuccess {String} title 챌린지 제목
 * @apiSuccess {String} year 챌린지를 완료한 년도
 * @apiSuccess {String} month 챌린지를 완료한 월
 * @apiSuccess {String} date 챌린지를 완료한 일
 * 
 * @apiSuccessExample {json} Success-Response:
 * 202 완료한 코스가 없을 때
 * {
 *  "status": 202,
 *  "data": {
 *    "courses": [],
 *  }
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 완료한 코스가 있을 때
 * {
 *  "status": 200,
 *  "data": {
 *    "courses": [
 *      {
 *        "id": 1,
 *        "situation": 2,
 *        "property": 3,
 *        "title": "나 돌아갈래",
 *        "totalDays": 7,
 *        "year": "2021",
 *        "month": "9",
 *        "date": "26",
 *        "challenges": [
 *          {
 *            "day": 1,
 *            "situation": 2,
 *            "title": "교복 입은 사진 찾아보기",
 *            "year": "2021",
 *            "month": "9",
 *            "date": "20",
 *          },
 *          // ...
 *        ]
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