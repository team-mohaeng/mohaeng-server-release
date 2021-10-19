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
 * 404 유저가 갖고 있지 않은 스킨인 경우
 * {
 *  "status": 404,
 *  "message": "유저가 갖고 있는 스킨이 아닙니다."
 * }
 * 
 * 404 유저가 갖고 있지 않은 캐릭터인 경우
 * {
 *  "status": 404,
 *  "message": "유저가 갖고 있는 캐릭터가 아닙니다."
 * }
 */

/**
 * @api {get} /api/character 캐릭터 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getCharacter
 * @apiGroup 캐릭터
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "Bearer": "{jwt}"
 * }
 * 
 * @apiSuccess {Object} currentCharacter
 * 자세한 속성은 Response를 참고해주세요 !
 * @apiSuccess {Object} currentSkin
 * @apiSuccess {Object[]} characters
 * @apiSuccess {Object[]} skins
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK 캐릭터 조회
 * {
 *  "status": 200,
 *  "data": {
 *    "currentCharacter": {
 *      "id": 1,
 *      "image": "image.url"
 *    },
 *    "currentSkin": {
 *      "id": 64,
 *      "image": "image.url"
 *    },
 *    "characters": [
 *      {
 *        "type": 1,
 *        "cards": [
 *          {
 *            "id": 1,
 *            "image": "image.url",
 *            "hasCard": true,
 *            "isNew": false
 *          },
 *          {
 *            "id": 2,
 *            "image": "image.url",
 *            "hasCard": true,
 *            "isNew": false
 *          },
 *          {
 *            "id": 3,
 *            "image": "",
 *            "hasCard": false,
 *            "isNew": false
 *          },
 *        ...
 *        ]
 *      },
 *      {
 *        "type": 2,
 *        "cards": [
 *          {
 *            "id": 10,
 *            "image": "",
 *            "hasCard": false,
 *            "isNew": false
 *          },
 *          {
 *            "id": 11,
 *            "image": "image.url",
 *            "hasCard": true,
 *            "isNew": false
 *          },
 *          {
 *            "id": 12,
 *            "image": "",
 *            "hasCard": false,
 *            "isNew": false
 *          },
 *        ...
 *        ]
 *      },
 *     ...     
 *    ],
 *    "skins": [
 *      {
 *        "id": 64,
 *        "image": "image.url",
 *        "hasSkin": true
 *      },
 *      {
 *        "id": 65,
 *        "image": "image.url",
 *        "hasSkin": true
 *      },
 *      {
 *        "id": 66,
 *        "image": "",
 *        "hasSkin": false
 *      },
 *     ...
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