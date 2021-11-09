/**
 * @api {post} /api/feed 안부 작성
 * 
 * @apiVersion 1.0.0
 * @apiName createFeed
 * @apiGroup 안부
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 *  "client": "aos" / "ios"
 * }
 * 
 * @apiParamExample {form-data} Request-Example:
 * KEY, VALUE, CONTENT TYPE
 * feed(Text), {"content": "엄마 나 모행 다녀올게", "mood": 2, "isPrivate": false}, application/json
 * 
 * KEY, VALUE
 * image(File), "imageURL"
 * 
 * @apiSuccess {Number} happy
 * @apiSuccess {Number} userHappy
 * @apiSuccess {Number} totalHappy
 * @apiSuccess {Boolean} isPenalty
 * @apiSuccess {Object} levelUp 포함 속성은 오른쪽 Success-Response 참고
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 안부 작성 성공
 * {
 *  "status": 200,
 *  "data": {
 *    "happy": 15, 
 *    "userHappy": 15,
 *    "totalHappy": 65,
 *    "isPenalty": false
 *    "levelUp": { //레벨업 하지 않을 경우에는 null
 *      "level": 10,
 *      "styleImg": "img"
 *     }
 *   }
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
 * @api {delete} /api/feed/:id 안부 삭제
 * 
 * @apiVersion 1.0.0
 * @apiName deleteFeed
 * @apiGroup 안부
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * @apiSuccess {String} message
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "피드를 삭제했습니다."
 * }
 * 
 * @apiErrorExample Error-Response:
 * 401 유효하지 않은 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 404 존재하지 않는 피드
 * {
 *  "status": 404,
 *  "message": "피드가 존재하지 않습니다."
 * }
 * 
 * 403 작성자만 피드 삭제 가능
 * {
 *  "status": 403,
 *  "message": "작성자만 피드를 삭제할 수 있습니다."
 * }
 * 
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */

/**
 * @api {put} /api/feed/emoji/:id 이모지 추가
 * 
 * @apiVersion 1.0.0
 * @apiName addEmoji
 * @apiGroup 안부
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "emojiId": 4
 * }
 *
 * @apiSuccess {String} message
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 이모지 추가 성공
 * {
 *  "status": 200,
 *  "message": "이모지를 추가하였습니다."
 * }
 * 
 * @apiErrorExample Error-Response:
 * 401 유효하지 않은 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 404 잘못된 이모지 번호
 * {
 *  "status": 404,
 *  "message": "잘못된 이모지 id입니다."
 * }
 * 
 * 404 이미 피드에 붙여져 있는 이모지
 * {
 *  "status": 404,
 *  "message": "이미 추가된 이모지입니다."
 * }
 * 
 * 404 존재하지 않는 피드
 * {
 *  "status": 404,
 *  "message": "피드가 존재하지 않습니다."
 * }
 * 
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */

/**
 * @api {delete} /api/feed/emoji/:id 이모지 삭제 
 * 
 * @apiVersion 1.0.0
 * @apiName deleteEmoji
 * @apiGroup 안부
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "emojiId": 2
 * }
 * 
 * @apiSuccess {String} message
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 이모지 삭제 성공
 * {
 *  "status": 200,
 *  "message": "이모지를 삭제하였습니다."
 * }
 * 
 * @apiErrorExample Error-Response:
 * 401 유효하지 않은 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 404 피드에 붙여져 있지 않는 이모지
 * {
 *  "status": 404,
 *  "message": "피드에 붙여진 이모지가 아닙니다."
 * }
 * 
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */

/**
 * @api {get} /api/feed/:year/:month 내 서랍장 조회
 * 
 * @apiVersion 1.0.0
 * @apiName myFeed
 * @apiGroup 안부
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * @apiSuccess {Number} postId
 * @apiSuccess {String} course
 * @apiSuccess {Number} challenge
 * @apiSuccess {String} image
 * @apiSuccess {Number} mood
 * @apiSuccess {String} content
 * @apiSuccess {String} nickname
 * @apiSuccess {String} year
 * @apiSuccess {String} month
 * @apiSuccess {String} date
 * @apiSuccess {String} day
 * @apiSuccess {Object[]} emoji
 * @apiSuccess {Number} myEmoji
 * @apiSuccess {Boolean} isReport
 * @apiSuccess {Boolean} isDelete
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 내 서랍장 조회
 * {
 *  "status": 200,
 *  "data": {
 *    "feeds": [
 *    {
 *      "postId": 131,
 *      "course": "초보 사진가",
 *      "challenge": 3,
 *      "image": "https://mohaeng.s3.ap-northeast-2.amazonaws.com/images/origin/1632731373241.jpg",
 *      "mood": 2,
 *      "content": "엄마 나 모행 다녀올게",
 *      "nickname": "모행삼",
 *      "year": "2021",
 *      "month": "09",
 *      "date": "27",
 *      "day": "월",
 *      "emoji": [],
 *      "myEmoji": 0,
 *      "isReport": false,
 *      "isDelete": true
 *    },
 *    {
 *      "postId": 118,
 *      "course": "초보 사진가",
 *      "challenge": 2,
 *      "image": "https://mohaeng.s3.ap-northeast-2.amazonaws.com/images/origin/1632731373241.jpg",
 *      "mood": 2,
 *      "content": "엄마 나 모행 다녀올게",
 *      "nickname": "모행삼",
 *      "year": "2021",
 *      "month": "09",
 *      "date": "22",
 *      "day": "수",
 *      "emoji": [
 *        {
 *          "id": 4,
 *          "count": 1
 *        },
 *        {
 *          "id": 6,
 *          "count": 3
 *        }
 *      ],
 *      "myEmoji": 4,
 *      "isReport": false,
 *      "isDelete": true
 *    }
 *   ]
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

/**
 * @api {get} /api/feed 커뮤니티 조회
 * 
 * @apiVersion 1.0.0
 * @apiName community
 * @apiGroup 안부
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * @apiSuccess {Boolean} isNew
 * @apiSuccess {Number} hasFeed
 * @apiSuccess {Number} userCount
 * 하단부터 feed 정보, 내 서랍장 response와 같음
 * @apiSuccess {Number} postId
 * @apiSuccess {String} course
 * @apiSuccess {Number} challenge
 * @apiSuccess {String} image
 * @apiSuccess {Number} mood
 * @apiSuccess {String} content
 * @apiSuccess {String} nickname
 * @apiSuccess {String} year
 * @apiSuccess {String} month
 * @apiSuccess {String} date
 * @apiSuccess {String} day
 * @apiSuccess {Object[]} emoji
 * @apiSuccess {Number} myEmoji
 * @apiSuccess {Boolean} isReport
 * @apiSuccess {Boolean} isDelete
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 커뮤니티 조회
 * {
 *  "status": 200,
 *  "data": {
 *    "isNew": false,
 *    "hasFeed": 2,
 *    "userCount": 0,
 *    "feeds": [
 *    {
 *      "postId": 135,
 *      "course": "중급 사진가",
 *      "challenge": 3,
 *      "image": "https://mohaeng.s3.ap-northeast-2.amazonaws.com/images/origin/1632731373241.jpg",
 *      "mood": 2,
 *      "content": "엄마 나 모행 다녀올게",
 *      "nickname": "모행일",
 *      "year": "2021",
 *      "month": "09",
 *      "date": "27",
 *      "day": "월",
 *      "emoji": [],
 *      "myEmoji": 0,
 *      "isReport": true,
 *      "isDelete": false
 *    },
 *    {
 *      "postId": 118,
 *      "course": "초보 사진가",
 *      "challenge": 2,
 *      "image": "https://mohaeng.s3.ap-northeast-2.amazonaws.com/images/origin/1632731373241.jpg",
 *      "mood": 2,
 *      "content": "엄마 나 모행 다녀올게",
 *      "nickname": "모행삼",
 *      "year": "2021",
 *      "month": "09",
 *      "date": "22",
 *      "day": "수",
 *      "emoji": [
 *        {
 *          "id": 4,
 *          "count": 1
 *        },
 *        {
 *          "id": 6,
 *          "count": 3
 *        }
 *      ],
 *      "myEmoji": 4,
 *      "isReport": false,
 *      "isDelete": true
 *    }
 *   ]
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

/**
 * @api {post} /api/feed/:id 안부 신고
 * 
 * @apiVersion 1.0.0
 * @apiName reportFeed
 * @apiGroup 안부
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "Bearer": "jwt"
 * }
 * 
 * @apiSuccess {String} message
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 안부 신고
 * {
 *  "status": 200,
 *  "message": "안부를 신고하였습니다."
 * }
 * 
 * @apiErrorExample Error-Response:
 * 401 유효하지 않은 유저
 * {
 *  "status": 401,
 *  "message": "유저가 존재하지 않습니다."
 * }
 * 
 * 404 이미 신고한 안부
 * {
 *  "status": 404,
 *  "message": "이미 신고한 안부입니다."
 * }
 * 
 * 404 본인이 작성한 안부
 * {
 *  "status": 404,
 *  "message": "본인이 작성한 안부는 신고할 수 없습니다."
 * }
 * 
 * 404 존재하지 않는 피드
 * {
 *  "status": 404,
 *  "message": "피드가 존재하지 않습니다."
 * }
 * 
 * 500 서버 에러
 * {
 *  "status": 500,
 *  "message": "서버 에러입니다. 서버 파트에게 문의해주세요 *^^*"
 * }
 */

