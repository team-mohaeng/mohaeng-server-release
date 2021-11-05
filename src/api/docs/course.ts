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
 * @api {get} /api/courses/complete 완료한 코스 목록 조회
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
 * @apiSuccess {Boolean} isProgress 유저가 현재 진행하고 있는 코스가 존재하는지 여부
 * @apiSuccess {Object[]} courses 완료한 코스 목록
 * @apiSuccess {Number} index 코스 인덱싱 아이디 (코스 고유 아이디 아님)
 * @apiSuccess {Number} id 코스 고유 아이디
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
 *    "isProgress": true,
 *    "courses": [],
 *  }
 * }
 * 
 * 200 완료한 코스가 있을 때
 * {
 *  "status": 200,
 *  "data": {
 *    "isProgress": true,
 *    "courses": [
 *      {
 *        "index": 1,
 *        "id": 4,
 *        "situation": 2,
 *        "property": 3,
 *        "title": "나 돌아갈래",
 *        "totalDays": 7,
 *        "year": "2021",
 *        "month": "09",
 *        "date": "26",
 *        "challenges": [
 *          {
 *            "day": 1,
 *            "situation": 2,
 *            "title": "교복 입은 사진 찾아보기",
 *            "year": "2021",
 *            "month": "09",
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

/**
 * @api {put} /api/courses/:courseId 코스 진행(변경)하기
 * 
 * @apiVersion 1.0.0
 * @apiName StartCourse
 * @apiGroup 코스
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 *  "client": "ios" or "aos"
 * }
 * 
 * @apiSuccess {Boolean} isComplete 챌린지 인증 상태
 * @apiSuccess {Boolean} isPenalty 패널티 적용 여부
 * @apiSuccess {String} mainCharacterImg 메인 뷰 상단 말풍선 속 캐릭터 이미지
 * @apiSuccess {String} popupCharacterImg 챌린지 인증 팝업 캐릭터 이미지
 * @apiSuccess {Object} course 현재 진행 중인 코스
 * @apiSuccess {Number} id 코스 아이디
 * @apiSuccess {Number} situation 코스 진행 상태 (1: 진행 중, 2: 완료)
 * @apiSuccess {Number} property 코스 속성 (1 ~ 7 -> 자세한 목록은 추후 슬랙에 공지)
 * @apiSuccess {String} title 코스 제목
 * @apiSuccess {Number} totalDays 코스 총 날짜 수
 * @apiSuccess {Number} currentDay 현재 진행 중인 챌린지 날짜
 * @apiSuccess {String} year 코스를 완료한 년도
 * @apiSuccess {String} month 코스를 완료한 월
 * @apiSuccess {String} date 코스를 완료한 일
 * @apiSuccess {Object[]} challenges 코스에 포함되어있는 챌린지들
 * @apiSuccess {Number} day 챌린지 날짜
 * @apiSuccess {Number} situation 코스 진행 상태 (0: 진행 전, 1: 진행 중, 2: 완료)
 * @apiSuccess {String} title 챌린지 제목
 * @apiSuccess {Number} happy 챌린지 성공 시 제공되는 해피지수
 * @apiSuccess {String} beforeMent 챌린지 수행 전 멘트
 * @apiSuccess {String} afterMent 챌린지 수행 완료 멘트
 * @apiSuccess {String} year 챌린지를 완료한 년도
 * @apiSuccess {String} month 챌린지를 완료한 월
 * @apiSuccess {String} date 챌린지를 완료한 일
 * @apiSuccess {String[]} badges 해당 챌린지 완료 시 받을 수 있는 뱃지 이름 목록
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 코스 진행/변경 완료 (변경이라면 isPenalty : true)
 * {
 *  "status": 200,
 *  "data": {
 *    "isComplete": false,
 *    "isPenalty": false,
 *    "mainCharacterImg": "url",
 *    "popupCharacterImg": "url",
 *    "course": {
 *      "id": 1,
 *      "situation": 1,
 *      "property": 1,
 *      "title": "초보 사진가",
 *      "totalDays": 7,
 *      "currentDay": 1,
 *      "year": "",
 *      "month": "",
 *      "date": "",
 *      "challenges": [
 *        {
 *          "day": 1,
 *          "situation": 1,
 *          "title": "하늘 사진 찍기"
 *          "happy": 12,
 *          "beforeMent": "난 몽글몽글한 구름들을 보면 기분이 좋아지더라~ 오늘 너희 동네의 하늘은 어때?",
 *          "afterMent": "엇, 그 구름 약간 날 닮은 것 같은데!? 일부러 이런 구름 찍어온거야? 너~",
 *          "year": "",
 *          "month": "",
 *          "date": "",
 *          "badges": [
 *            "성장한 챌린저",
 *            "모행 홀릭 챌린저"
 *          ]
 *        },
 *        // ...
 *      ]
 *    }
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 400 헤더 오류
 * {
 *  "status": 400,
 *  "message": "헤더를 확인해주세요."
 * }
 * 
 * 401 존재하지 않는 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 404 존재하지 않는 코스
 * {
 *  "status": 404,
 *  "message": "해당 id의 코스가 존재하지 않습니다."
 * }
 */