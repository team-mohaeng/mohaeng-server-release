/**
 * @api {get} /api/today 오늘의 챌린지 조회
 * 
 * @apiVersion 1.0.0
 * @apiName Today
 * @apiGroup 챌린지
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
 * 200 챌린지 진행 중
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
 * 200 챌린지 진행 완료해서 코스 완료
 * {
 *  "status": 200,
 *  "data": {
 *    "isComplete": true,
 *    "isPenalty": false,
 *    "mainCharacterImg": "url",
 *    "popupCharacterImg": "url",
 *    "course": {
 *      "id": 1,
 *      "situation": 2,
 *      "property": 1,
 *      "title": "초보 사진가",
 *      "totalDays": 7,
 *      "currentDay": 7,
 *      "year": "2021",
 *      "month": "09",
 *      "date": "26",
 *      "challenges": [
 *        {
 *          "day": 1,
 *          "situation": 2,
 *          "title": "하늘 사진 찍기"
 *          "happy": 12,
 *          "beforeMent": "난 몽글몽글한 구름들을 보면 기분이 좋아지더라~ 오늘 너희 동네의 하늘은 어때?",
 *          "afterMent": "엇, 그 구름 약간 날 닮은 것 같은데!? 일부러 이런 구름 찍어온거야? 너~",
 *          "year": "2021",
 *          "month": "09",
 *          "date": "20",
 *          "badges": []
 *        },
 *        // ...
 *        {
 *          "day": 7,
 *          "situation": 2,
 *          "title": "하늘 사진 찍기"
 *          "happy": 12,
 *          "beforeMent": "난 몽글몽글한 구름들을 보면 기분이 좋아지더라~ 오늘 너희 동네의 하늘은 어때?",
 *          "afterMent": "엇, 그 구름 약간 날 닮은 것 같은데!? 일부러 이런 구름 찍어온거야? 너~",
 *          "year": "2021",
 *          "month": "09",
 *          "date": "26",
 *          "badges": [
 *            "건강 코스 3개"
 *          ]
 *        },
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
 * 404 진행 중인 코스가 없는 경우
 * {
 *  "status": 404,
 *  "message": "진행 중인 코스가 없습니다."
 * }
 */

/**
 * @api {put} /api/today/:courseId/:challengeId 챌린지 인증하기
 * 
 * @apiVersion 1.0.0
 * @apiName Certification
 * @apiGroup 챌린지
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 * }
 * 
 * @apiSuccess {String} characterImg 인증 팝업창에 나타날 캐릭터 이미지
 * @apiSuccess {Object} challengeCompletion 챌린지 성공 응답 객체
 * @apiSuccess {Number} happy 유저가 해당 단계에서 받은 해피지수
 * @apiSuccess {Number} userHappy 해피지수를 받은 후 유저의 총 해피지수
 * @apiSuccess {Number} fullHappy 유저의 현재 레벨의 총 해피지수
 * @apiSuccess {Boolean} isPenalty 패널티 적용 여부. 패널티가 true라면 해피지수는 0
 * @apiSuccess {Object} courseCompletion 코스 완료 응답 객체
 * @apiSuccess {Number} property 완료한 코스의 속성
 * @apiSuccess {String} title 완료한 코스의 제목
 * @apiSuccess {Object} levelUp 레벨업 응답 객체
 * @apiSuccess {Number} level 레벨업한 레벨
 * @apiSuccess {String} styleImg 유저가 받을 스타일의 이미지
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 챌린지만 성공 (코스 완료 X, 레벨업 X)
 * {
 *  "status": 200,
 *  "data": {
 *    "characterImg": "url",
 *    "challengeCompletion": {
 *      "happy": 25,
 *      "userHappy": 28,
 *      "fullHappy": 35,
 *      "isPenalty": false
 *    },
 *    "courseCompletion": {},
 *    "levelUp": {},
 *  }
 * }
 * 
 * 200 챌린지 성공 후 코스 완료 (레벨업 X)
 * {
 *  "status": 200,
 *  "data": {
 *    "characterImg": "url",
 *    "challengeCompletion": {
 *      "happy": 25,
 *      "userHappy": 28,
 *      "fullHappy": 100,
 *      "isPenalty": false
 *    },
 *    "courseCompletion": {
 *      "property": 1,
 *      "title": "초보 사진가",
 *      "happy": 20,
 *      "userHappy": 48,
 *      "fullHappy": 100
 *    },
 *    "levelUp": {},
 *  }
 * }
 * 
 * 200 챌린지 성공 후 코스 완료 (레벨업 O)
 * {
 *  "status": 200,
 *  "data": {
 *    "characterImg": "url",
 *    "challengeCompletion": {
 *      "happy": 25,
 *      "userHappy": 17,
 *      "fullHappy": 35,
 *      "isPenalty": false
 *    },
 *    "courseCompletion": {
 *      "property": 1,
 *      "title": "초보 사진가",
 *      "happy": 20,
 *      "userHappy": 2,
 *      "fullHappy": 40
 *    },
 *    "levelUp": {
 *      "level": 5,
 *      "styleImg": "url"
 *    },
 *  }
 * }
 * 
 * 200 패널티가 있을 때
 * {
 *  "status": 200,
 *  "data": {
 *    "characterImg": "",
 *    "challengeCompletion": {
 *      "happy": 0,
 *      "userHappy": 2,
 *      "fullHappy": 25,
 *      "isPenalty": true
 *    },
 *    "courseCompletion": {},
 *    "levelUp": {}
 *  }
 * }
 * 
 * 200 만렙으로 레벨업한 경우
 * {
 *  "status": 200,
 *  "data": {
 *    "characterImg": "url",
 *    "challengeCompletion": {
 *      "happy": 10,
 *      "userHappy": 0,
 *      "fullHappy": 330,
 *      "isPenalty": false
 *    },
 *    "courseCompletion": {},
 *    "levelUp": {
 *      "level": 40,
 *      "styleImg": "url"
 *    },
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 400 현재 진행 중인 코스 또는 챌린지가 아닐 때
 * {
 *  "status": 400,
 *  "message": "현재 진행 중인 코스 또는 챌린지가 아닙니다."
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
 * 
 * 404 존재하지 않는 챌린지
 * {
 *  "status": 404,
 *  "message": "해당 id의 챌린지가 존재하지 않습니다."
 * }
 * 
 * 409 이미 인증한 경우
 * {
 *  "status": 409,
 *  "message": "이미 인증이 완료되었습니다."
 * }
 */