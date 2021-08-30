define({ "api": [
  {
    "type": "put",
    "url": "/api/profile/:id",
    "title": "닉네임 변경",
    "version": "1.0.0",
    "name": "changeNickname",
    "group": "Profile",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"nickname\": \"시원뿡\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"message\": \"닉네임을 변경했습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "400 닉네임 글자 제한\n{\n \"status\": 400,\n \"message\": \"닉네임은 1-6글자 이내로 작성해주세요\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "400 닉네임 중복\n{\n \"status\": 403,\n \"message\": \"이미 사용 중인 닉네임입니다.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "400 이전과 같은 닉네임\n{\n \"status\": 403,\n \"message\": \"기존 닉네임과 다른 닉네임으로 설정해주세요.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/apidoc/profile.ts",
    "groupTitle": "Profile"
  }
] });
