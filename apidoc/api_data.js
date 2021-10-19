define({ "api": [
  {
    "type": "put",
    "url": "/api/password",
    "title": "비밀번호 변경",
    "version": "1.0.0",
    "name": "changePassword",
    "group": "로그인/회원가입",
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
          "content": "{\n \"email\": \"mohaeng@naver.com\"\n \"password\": \"mohaeng1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"message\": \"비밀번호 바꾸기를 성공하였습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n404 잘못된 이메일 형식\n{\n \"status\": 404,\n \"message\": \"이메일 형식이 올바르지 않습니다.\"\n}\n\n404 비밀번호 영문, 숫자 미포함\n{\n \"status\": 404,\n \"message\": \"영문, 숫자를 모두 포함하여 입력해주세요.\"\n}\n\n404 비밀번호 글자수 제한\n{\n \"status\": 404,\n \"message\": \"8-16자의 비밀번호를 입력해주세요.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/auth.ts",
    "groupTitle": "로그인/회원가입"
  },
  {
    "type": "post",
    "url": "/api/nickname",
    "title": "소셜로그인 회원가입",
    "version": "1.0.0",
    "name": "createUser",
    "group": "로그인/회원가입",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"token\": \"token\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"nickname\": \"시원뿡\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "jwt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"jwt\": \"jwt 토큰\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n404 닉네임 글자 제한\n{\n \"status\": 404,\n \"message\": \"닉네임은 1-6글자 이내로 작성해주세요\"\n}\n\n404 닉네임 중복\n{\n \"status\": 404,\n \"message\": \"이미 사용 중인 닉네임입니다.\"\n}\n\n403 토큰 누락\n{\n \"status\": 403,\n \"message\": \"토큰이 없습니다. 토큰을 함께 보내주세요.\"\n}\n\n403 토큰 유효성 검증 실패\n{\n \"status\": 403,\n \"message\": \"유효성 인증에 실패하였습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/auth.ts",
    "groupTitle": "로그인/회원가입"
  },
  {
    "type": "delete",
    "url": "/api/delete",
    "title": "회원탈퇴",
    "version": "1.0.0",
    "name": "deleteAccount",
    "group": "로그인/회원가입",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"message\": \"계정을 삭제하였습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/auth.ts",
    "groupTitle": "로그인/회원가입"
  },
  {
    "type": "post",
    "url": "/api/kakao",
    "title": "카카오 토큰 유효성 검사",
    "version": "1.0.0",
    "name": "kakaoLogin",
    "group": "로그인/회원가입",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Bearer\": \"카카오 토큰\"\n}",
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
          "content": "200 OK\n{\n \"status\": 200,\n \"message\": \"토큰 인증을 완료하였습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/auth.ts",
    "groupTitle": "로그인/회원가입"
  },
  {
    "type": "get",
    "url": "/api/password/:email",
    "title": "인증코드 보내기",
    "version": "1.0.0",
    "name": "sendCode",
    "group": "로그인/회원가입",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "number",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"number\": \"인증코드숫자\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/auth.ts",
    "groupTitle": "로그인/회원가입"
  },
  {
    "type": "post",
    "url": "/api/signin",
    "title": "로그인",
    "version": "1.0.0",
    "name": "signin",
    "group": "로그인/회원가입",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"token\": \"fcm token\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"email\": \"mohaeng_official@naver.com\"\n \"password\": \"mohaengmohaeng\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "jwt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"jwt\": \"jwt 토큰\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 잘못된 이메일 형식\n{\n \"status\": 404,\n \"message\": \"이메일 형식이 올바르지 않습니다.\"\n}\n\n403 토큰 누락\n{\n \"status\": 403,\n \"message\": \"토큰이 없습니다. 토큰을 함께 보내주세요.\"\n}\n\n403 토큰 유효성 검증 실패\n{\n \"status\": 403,\n \"message\": \"유효성 인증에 실패하였습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/auth.ts",
    "groupTitle": "로그인/회원가입"
  },
  {
    "type": "post",
    "url": "/api/signup",
    "title": "회원가입",
    "version": "1.0.0",
    "name": "signup",
    "group": "로그인/회원가입",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"token\": \"fcm token\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"email\": \"mohaeng_official@naver.com\"\n \"password\": \"mohaengmohaeng\"\n \"nickname\": \"모행\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "jwt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"jwt\": \"jwt 토큰\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404 잘못된 이메일 형식\n{\n \"status\": 404,\n \"message\": \"이메일 형식이 올바르지 않습니다.\"\n}\n\n404 닉네임 글자 제한\n{\n \"status\": 404,\n \"message\": \"닉네임은 1-6글자 이내로 작성해주세요\"\n}\n\n404 닉네임 중복\n{\n \"status\": 404,\n \"message\": \"이미 사용 중인 닉네임입니다.\"\n}\n\n404 비밀번호 영문, 숫자 미포함\n{\n \"status\": 404,\n \"message\": \"영문, 숫자를 모두 포함하여 입력해주세요.\"\n}\n\n404 비밀번호 글자수 제한\n{\n \"status\": 404,\n \"message\": \"8-16자의 비밀번호를 입력해주세요.\"\n}\n\n403 토큰 누락\n{\n \"status\": 403,\n \"message\": \"토큰이 없습니다. 토큰을 함께 보내주세요.\"\n}\n\n403 토큰 유효성 검증 실패\n{\n \"status\": 403,\n \"message\": \"유효성 인증에 실패하였습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/auth.ts",
    "groupTitle": "로그인/회원가입"
  },
  {
    "type": "put",
    "url": "/api/badge",
    "title": "달성한 뱃지 조회",
    "version": "1.0.0",
    "name": "getBadge",
    "group": "뱃지",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "badges",
            "description": "<p>하단부터 Object 정보</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "info",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "image",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "hasBadge",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK 달성한 뱃지 조회 성공\n{\n \"status\": 200,\n \"data\": {\n   \"badges\": [\n   {\n     \"id\": 1,\n     \"name\": \"내 건강 챙기미\",\n     \"info\": \"건강 코스 3개\",\n     \"image\": \"imageUrl\",\n     \"hasBadge\": false\n   },\n   {\n     \"id\": 2,\n     \"name\": \"아이마이미마인\",\n     \"info\": \"\",\n     \"image\": \"imageUrl\",\n     \"hasBadge\": true\n   },\n   {\n     \"id\": 3,\n     \"name\": \"바른생활 모범생\",\n     \"info\": \"생활습관 코스 3개\",\n     \"image\": \"imageUrl\",\n     \"hasBadge\": false\n   }\n  ...\n   ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/badge.ts",
    "groupTitle": "뱃지"
  },
  {
    "type": "put",
    "url": "/api/feed/emoji/:id",
    "title": "이모지 추가",
    "version": "1.0.0",
    "name": "addEmoji",
    "group": "안부",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"emojiId\": 4\n}",
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
          "content": "200 OK 이모지 추가 성공\n{\n \"status\": 200,\n \"message\": \"이모지를 추가하였습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n404 잘못된 이모지 번호\n{\n \"status\": 404,\n \"message\": \"잘못된 이모지 id입니다.\"\n}\n\n404 이미 피드에 붙여져 있는 이모지\n{\n \"status\": 404,\n \"message\": \"이미 추가된 이모지입니다.\"\n}\n\n404 존재하지 않는 피드\n{\n \"status\": 404,\n \"message\": \"피드가 존재하지 않습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/feed.ts",
    "groupTitle": "안부"
  },
  {
    "type": "get",
    "url": "/api/feed",
    "title": "커뮤니티 조회",
    "version": "1.0.0",
    "name": "community",
    "group": "안부",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isNew",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hasFeed",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userCount",
            "description": "<p>하단부터 feed 정보, 내 서랍장 response와 같음</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "postId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "mood",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "day",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "emoji",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "myEmoji",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isReport",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isDelete",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK 커뮤니티 조회\n{\n \"status\": 200,\n \"data\": {\n   \"isNew\": false,\n   \"hasFeed\": 2,\n   \"userCount\": 0,\n   \"feeds\": [\n   {\n     \"postId\": 135,\n     \"course\": \"중급 사진가\",\n     \"challenge\": 3,\n     \"image\": \"https://mohaeng.s3.ap-northeast-2.amazonaws.com/images/origin/1632731373241.jpg\",\n     \"mood\": 2,\n     \"content\": \"엄마 나 모행 다녀올게\",\n     \"nickname\": \"모행일\",\n     \"year\": \"2021\",\n     \"month\": \"09\",\n     \"date\": \"27\",\n     \"day\": \"월\",\n     \"emoji\": [],\n     \"myEmoji\": 0,\n     \"isReport\": true,\n     \"isDelete\": false\n   },\n   {\n     \"postId\": 118,\n     \"course\": \"초보 사진가\",\n     \"challenge\": 2,\n     \"image\": \"https://mohaeng.s3.ap-northeast-2.amazonaws.com/images/origin/1632731373241.jpg\",\n     \"mood\": 2,\n     \"content\": \"엄마 나 모행 다녀올게\",\n     \"nickname\": \"모행삼\",\n     \"year\": \"2021\",\n     \"month\": \"09\",\n     \"date\": \"22\",\n     \"day\": \"수\",\n     \"emoji\": [\n       {\n         \"id\": 4,\n         \"count\": 1\n       },\n       {\n         \"id\": 6,\n         \"count\": 3\n       }\n     ],\n     \"myEmoji\": 4,\n     \"isReport\": false,\n     \"isDelete\": true\n   }\n  ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/feed.ts",
    "groupTitle": "안부"
  },
  {
    "type": "post",
    "url": "/api/feed",
    "title": "안부 작성",
    "version": "1.0.0",
    "name": "createFeed",
    "group": "안부",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "KEY, VALUE, CONTENT TYPE\nfeed(Text), {\"content\": \"엄마 나 모행 다녀올게\", \"mood\": 2, \"isPrivate\": false}, application/json\n\nKEY, VALUE\nimage(File), \"imageURL\"\n\n사진참고\nhttps://mohaeng.s3.ap-northeast-2.amazonaws.com/%EC%A0%9C%EB%AA%A9+%EC%97%86%EC%9D%8C.png",
          "type": "form-data"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "happy",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userHappy",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalHappy",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isPenalty",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "levelUp",
            "description": "<p>포함 속성은 오른쪽 Success-Response 참고</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK 안부 작성 성공\n{\n \"status\": 200,\n \"data\": {\n   \"happy\": 15, \n   \"userHappy\": 15,\n   \"totalHappy\": 65,\n   \"isPenalty\": false\n   \"levelUp\": { //레벨업 하지 않을 경우에는 null\n     \"level\": 10,\n     \"styleImg\": \"img\"\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n404 닉네임 글자 제한\n{\n \"status\": 404,\n \"message\": \"닉네임은 1-6글자 이내로 작성해주세요\"\n}\n\n404 닉네임 중복\n{\n \"status\": 404,\n \"message\": \"이미 사용 중인 닉네임입니다.\"\n}\n\n404 이전과 같은 닉네임\n{\n \"status\": 404,\n \"message\": \"기존 닉네임과 다른 닉네임으로 설정해주세요.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/feed.ts",
    "groupTitle": "안부"
  },
  {
    "type": "delete",
    "url": "/api/feed/emoji/:id",
    "title": "이모지 삭제",
    "version": "1.0.0",
    "name": "deleteEmoji",
    "group": "안부",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"emojiId\": 2\n}",
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
          "content": "200 OK 이모지 삭제 성공\n{\n \"status\": 200,\n \"message\": \"이모지를 삭제하였습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n404 피드에 붙여져 있지 않는 이모지\n{\n \"status\": 404,\n \"message\": \"피드에 붙여진 이모지가 아닙니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/feed.ts",
    "groupTitle": "안부"
  },
  {
    "type": "delete",
    "url": "/api/feed/:id",
    "title": "안부 삭제",
    "version": "1.0.0",
    "name": "deleteFeed",
    "group": "안부",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
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
          "content": "200 OK\n{\n \"status\": 200,\n \"message\": \"피드를 삭제했습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n404 존재하지 않는 피드\n{\n \"status\": 404,\n \"message\": \"피드가 존재하지 않습니다.\"\n}\n\n403 작성자만 피드 삭제 가능\n{\n \"status\": 403,\n \"message\": \"작성자만 피드를 삭제할 수 있습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/feed.ts",
    "groupTitle": "안부"
  },
  {
    "type": "get",
    "url": "/api/feed/:year/:month",
    "title": "내 서랍장 조회",
    "version": "1.0.0",
    "name": "myFeed",
    "group": "안부",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "postId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "course",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "challenge",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "mood",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "day",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "emoji",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "myEmoji",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isReport",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isDelete",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK 내 서랍장 조회\n{\n \"status\": 200,\n \"data\": {\n   \"feeds\": [\n   {\n     \"postId\": 131,\n     \"course\": \"초보 사진가\",\n     \"challenge\": 3,\n     \"image\": \"https://mohaeng.s3.ap-northeast-2.amazonaws.com/images/origin/1632731373241.jpg\",\n     \"mood\": 2,\n     \"content\": \"엄마 나 모행 다녀올게\",\n     \"nickname\": \"모행삼\",\n     \"year\": \"2021\",\n     \"month\": \"09\",\n     \"date\": \"27\",\n     \"day\": \"월\",\n     \"emoji\": [],\n     \"myEmoji\": 0,\n     \"isReport\": false,\n     \"isDelete\": true\n   },\n   {\n     \"postId\": 118,\n     \"course\": \"초보 사진가\",\n     \"challenge\": 2,\n     \"image\": \"https://mohaeng.s3.ap-northeast-2.amazonaws.com/images/origin/1632731373241.jpg\",\n     \"mood\": 2,\n     \"content\": \"엄마 나 모행 다녀올게\",\n     \"nickname\": \"모행삼\",\n     \"year\": \"2021\",\n     \"month\": \"09\",\n     \"date\": \"22\",\n     \"day\": \"수\",\n     \"emoji\": [\n       {\n         \"id\": 4,\n         \"count\": 1\n       },\n       {\n         \"id\": 6,\n         \"count\": 3\n       }\n     ],\n     \"myEmoji\": 4,\n     \"isReport\": false,\n     \"isDelete\": true\n   }\n  ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/feed.ts",
    "groupTitle": "안부"
  },
  {
    "type": "post",
    "url": "/api/feed/:id",
    "title": "안부 신고",
    "version": "1.0.0",
    "name": "reportFeed",
    "group": "안부",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
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
          "content": "200 OK 안부 신고\n{\n \"status\": 200,\n \"message\": \"안부를 신고하였습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n404 이미 신고한 안부\n{\n \"status\": 404,\n \"message\": \"이미 신고한 안부입니다.\"\n}\n\n404 본인이 작성한 안부\n{\n \"status\": 404,\n \"message\": \"본인이 작성한 안부는 신고할 수 없습니다.\"\n}\n\n404 존재하지 않는 피드\n{\n \"status\": 404,\n \"message\": \"피드가 존재하지 않습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/feed.ts",
    "groupTitle": "안부"
  },
  {
    "type": "get",
    "url": "/api/message",
    "title": "푸시 알람 조회",
    "version": "1.0.0",
    "name": "Chatting",
    "group": "채팅",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
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
            "field": "date",
            "description": "<p>알람 받은 날짜</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "message",
            "description": "<p>푸시 알람 멘트 배열</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isNew",
            "description": "<p>유저가 확인했는지 여부</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 알람을 받지 않은 상태\n{\n \"status\": 200,\n \"data\": {\n   \"messages\": {\n     \"date\": \"2021-10-12T15:00:00.000Z\",\n     \"message\" : [],\n     \"isNew\": false\n   }\n }\n}\n\n200 알람을 받은 상태\n{\n \"status\": 200,\n \"data\": {\n   \"messages\": {\n     \"date\": \"2021-10-12T15:00:00.000Z\",\n     \"message\" : [\n       \"모행, 오늘 어땠어?\",\n       \"많이 힘들었구나...ㅜㅜ\",\n       \"챌린지 인증하고 푹 자자!\"\n     ],\n     \"isNew\": false\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 존재하지 않는 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/message.ts",
    "groupTitle": "채팅"
  },
  {
    "type": "put",
    "url": "/api/today/:courseId/:challengeId",
    "title": "챌린지 인증하기",
    "version": "1.0.0",
    "name": "Certification",
    "group": "챌린지",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
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
            "field": "characterImg",
            "description": "<p>인증 팝업창에 나타날 캐릭터 이미지</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "challengeCompletion",
            "description": "<p>챌린지 성공 응답 객체</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "happy",
            "description": "<p>유저가 해당 단계에서 받은 해피지수</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "userHappy",
            "description": "<p>해피지수를 받은 후 유저의 총 해피지수</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "fullHappy",
            "description": "<p>유저의 현재 레벨의 총 해피지수</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isPenalty",
            "description": "<p>패널티 적용 여부. 패널티가 true라면 해피지수는 0</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "courseCompletion",
            "description": "<p>코스 완료 응답 객체</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "property",
            "description": "<p>완료한 코스의 속성</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>완료한 코스의 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "levelUp",
            "description": "<p>레벨업 응답 객체</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>레벨업한 레벨</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "styleImg",
            "description": "<p>유저가 받을 스타일의 이미지</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 챌린지만 성공 (코스 완료 X, 레벨업 X)\n{\n \"status\": 200,\n \"data\": {\n   \"characterImg\": \"url\",\n   \"challengeCompletion\": {\n     \"happy\": 25,\n     \"userHappy\": 28,\n     \"fullHappy\": 35,\n     \"isPenalty\": false\n   },\n   \"courseCompletion\": {},\n   \"levelUp\": {},\n }\n}\n\n200 챌린지 성공 후 코스 완료 (레벨업 X)\n{\n \"status\": 200,\n \"data\": {\n   \"characterImg\": \"url\",\n   \"challengeCompletion\": {\n     \"happy\": 25,\n     \"userHappy\": 28,\n     \"fullHappy\": 100,\n     \"isPenalty\": false\n   },\n   \"courseCompletion\": {\n     \"property\": 1,\n     \"title\": \"초보 사진가\",\n     \"happy\": 20,\n     \"userHappy\": 48,\n     \"fullHappy\": 100\n   },\n   \"levelUp\": {},\n }\n}\n\n200 챌린지 성공 후 코스 완료 (레벨업 O)\n{\n \"status\": 200,\n \"data\": {\n   \"characterImg\": \"url\",\n   \"challengeCompletion\": {\n     \"happy\": 25,\n     \"userHappy\": 17,\n     \"fullHappy\": 35,\n     \"isPenalty\": false\n   },\n   \"courseCompletion\": {\n     \"property\": 1,\n     \"title\": \"초보 사진가\",\n     \"happy\": 20,\n     \"userHappy\": 2,\n     \"fullHappy\": 40\n   },\n   \"levelUp\": {\n     \"level\": 5,\n     \"styleImg\": \"url\"\n   },\n }\n}\n\n200 패널티가 있을 때\n{\n \"status\": 200,\n \"data\": {\n   \"characterImg\": \"\",\n   \"challengeCompletion\": {\n     \"happy\": 0,\n     \"userHappy\": 2,\n     \"fullHappy\": 25,\n     \"isPenalty\": true\n   },\n   \"courseCompletion\": {},\n   \"levelUp\": {}\n }\n}\n\n200 만렙으로 레벨업한 경우\n{\n \"status\": 200,\n \"data\": {\n   \"characterImg\": \"url\",\n   \"challengeCompletion\": {\n     \"happy\": 10,\n     \"userHappy\": 0,\n     \"fullHappy\": 330,\n     \"isPenalty\": false\n   },\n   \"courseCompletion\": {},\n   \"levelUp\": {\n     \"level\": 40,\n     \"styleImg\": \"url\"\n   },\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "400 현재 진행 중인 코스 또는 챌린지가 아닐 때\n{\n \"status\": 400,\n \"message\": \"현재 진행 중인 코스 또는 챌린지가 아닙니다.\"\n}\n\n401 존재하지 않는 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n404 존재하지 않는 코스\n{\n \"status\": 404,\n \"message\": \"해당 id의 코스가 존재하지 않습니다.\"\n}\n\n404 존재하지 않는 챌린지\n{\n \"status\": 404,\n \"message\": \"해당 id의 챌린지가 존재하지 않습니다.\"\n}\n\n409 이미 인증한 경우\n{\n \"status\": 409,\n \"message\": \"이미 인증이 완료되었습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/challenge.ts",
    "groupTitle": "챌린지"
  },
  {
    "type": "get",
    "url": "/api/today",
    "title": "오늘의 챌린지 조회",
    "version": "1.0.0",
    "name": "Today",
    "group": "챌린지",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isComplete",
            "description": "<p>챌린지 인증 상태</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isPenalty",
            "description": "<p>패널티 적용 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mainCharacterImg",
            "description": "<p>메인 뷰 상단 말풍선 속 캐릭터 이미지</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popupCharacterImg",
            "description": "<p>챌린지 인증 팝업 캐릭터 이미지</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course",
            "description": "<p>현재 진행 중인 코스</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>코스 아이디</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "situation",
            "description": "<p>코스 진행 상태 (1: 진행 중, 2: 완료)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "property",
            "description": "<p>코스 속성 (1 ~ 7 -&gt; 자세한 목록은 추후 슬랙에 공지)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>코스 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalDays",
            "description": "<p>코스 총 날짜 수</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "currentDay",
            "description": "<p>현재 진행 중인 챌린지 날짜</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": "<p>코스를 완료한 년도</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": "<p>코스를 완료한 월</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>코스를 완료한 일</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "challenges",
            "description": "<p>코스에 포함되어있는 챌린지들</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>챌린지 날짜</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "happy",
            "description": "<p>챌린지 성공 시 제공되는 해피지수</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "beforeMent",
            "description": "<p>챌린지 수행 전 멘트</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "afterMent",
            "description": "<p>챌린지 수행 완료 멘트</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "badges",
            "description": "<p>해당 챌린지 완료 시 받을 수 있는 뱃지 이름 목록</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 챌린지 진행 중\n{\n \"status\": 200,\n \"data\": {\n   \"isComplete\": false,\n   \"isPenalty\": false,\n   \"mainCharacterImg\": \"url\",\n   \"popupCharacterImg\": \"url\",\n   \"course\": {\n     \"id\": 1,\n     \"situation\": 1,\n     \"property\": 1,\n     \"title\": \"초보 사진가\",\n     \"totalDays\": 7,\n     \"currentDay\": 1,\n     \"year\": \"\",\n     \"month\": \"\",\n     \"date\": \"\",\n     \"challenges\": [\n       {\n         \"day\": 1,\n         \"situation\": 1,\n         \"title\": \"하늘 사진 찍기\"\n         \"happy\": 12,\n         \"beforeMent\": \"난 몽글몽글한 구름들을 보면 기분이 좋아지더라~ 오늘 너희 동네의 하늘은 어때?\",\n         \"afterMent\": \"엇, 그 구름 약간 날 닮은 것 같은데!? 일부러 이런 구름 찍어온거야? 너~\",\n         \"year\": \"\",\n         \"month\": \"\",\n         \"date\": \"\",\n         \"badges\": [\n           \"성장한 챌린저\",\n           \"모행 홀릭 챌린저\"\n         ]\n       },\n       // ...\n     ]\n   }\n }\n}\n\n200 챌린지 진행 완료해서 코스 완료\n{\n \"status\": 200,\n \"data\": {\n   \"isComplete\": true,\n   \"isPenalty\": false,\n   \"mainCharacterImg\": \"url\",\n   \"popupCharacterImg\": \"url\",\n   \"course\": {\n     \"id\": 1,\n     \"situation\": 2,\n     \"property\": 1,\n     \"title\": \"초보 사진가\",\n     \"totalDays\": 7,\n     \"currentDay\": 7,\n     \"year\": \"2021\",\n     \"month\": \"09\",\n     \"date\": \"26\",\n     \"challenges\": [\n       {\n         \"day\": 1,\n         \"situation\": 2,\n         \"title\": \"하늘 사진 찍기\"\n         \"happy\": 12,\n         \"beforeMent\": \"난 몽글몽글한 구름들을 보면 기분이 좋아지더라~ 오늘 너희 동네의 하늘은 어때?\",\n         \"afterMent\": \"엇, 그 구름 약간 날 닮은 것 같은데!? 일부러 이런 구름 찍어온거야? 너~\",\n         \"year\": \"2021\",\n         \"month\": \"09\",\n         \"date\": \"20\",\n         \"badges\": []\n       },\n       // ...\n       {\n         \"day\": 7,\n         \"situation\": 2,\n         \"title\": \"하늘 사진 찍기\"\n         \"happy\": 12,\n         \"beforeMent\": \"난 몽글몽글한 구름들을 보면 기분이 좋아지더라~ 오늘 너희 동네의 하늘은 어때?\",\n         \"afterMent\": \"엇, 그 구름 약간 날 닮은 것 같은데!? 일부러 이런 구름 찍어온거야? 너~\",\n         \"year\": \"2021\",\n         \"month\": \"09\",\n         \"date\": \"26\",\n         \"badges\": [\n           \"건강 코스 3개\"\n         ]\n       },\n     ]\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 존재하지 않는 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n404 진행 중인 코스가 없는 경우\n{\n \"status\": 404,\n \"message\": \"진행 중인 코스가 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/challenge.ts",
    "groupTitle": "챌린지"
  },
  {
    "type": "get",
    "url": "/api/character",
    "title": "캐릭터 조회",
    "version": "1.0.0",
    "name": "getCharacter",
    "group": "캐릭터",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "currentCharacter",
            "description": "<p>자세한 속성은 Response를 참고해주세요 !</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "currentSkin",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "characters",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "skins",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK 캐릭터 조회\n{\n \"status\": 200,\n \"data\": {\n   \"currentCharacter\": {\n     \"id\": 1,\n     \"image\": \"image.url\"\n   },\n   \"currentSkin\": {\n     \"id\": 64,\n     \"image\": \"image.url\"\n   },\n   \"characters\": [\n     {\n       \"type\": 1,\n       \"cards\": [\n         {\n           \"id\": 1,\n           \"image\": \"image.url\",\n           \"hasCard\": true,\n           \"isNew\": false\n         },\n         {\n           \"id\": 2,\n           \"image\": \"image.url\",\n           \"hasCard\": true,\n           \"isNew\": false\n         },\n         {\n           \"id\": 3,\n           \"image\": \"\",\n           \"hasCard\": false,\n           \"isNew\": false\n         },\n       ...\n       ]\n     },\n     {\n       \"type\": 2,\n       \"cards\": [\n         {\n           \"id\": 10,\n           \"image\": \"\",\n           \"hasCard\": false,\n           \"isNew\": false\n         },\n         {\n           \"id\": 11,\n           \"image\": \"image.url\",\n           \"hasCard\": true,\n           \"isNew\": false\n         },\n         {\n           \"id\": 12,\n           \"image\": \"\",\n           \"hasCard\": false,\n           \"isNew\": false\n         },\n       ...\n       ]\n     },\n    ...     \n   ],\n   \"skins\": [\n     {\n       \"id\": 64,\n       \"image\": \"image.url\",\n       \"hasSkin\": true\n     },\n     {\n       \"id\": 65,\n       \"image\": \"image.url\",\n       \"hasSkin\": true\n     },\n     {\n       \"id\": 66,\n       \"image\": \"\",\n       \"hasSkin\": false\n     },\n    ...\n   ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 존재하지 않는 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/character.ts",
    "groupTitle": "캐릭터"
  },
  {
    "type": "put",
    "url": "/api/character",
    "title": "캐릭터 변경",
    "version": "1.0.0",
    "name": "setCharacter",
    "group": "캐릭터",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"characterSkin\": 3,\n \"characterType\": 1,\n \"characterCard\": 2\n}",
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
          "content": "200 OK 캐릭터 변경\n{\n \"status\": 200,\n \"message\": \"캐릭터를 변경하였습니다.\" \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 존재하지 않는 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n404 유저가 갖고 있지 않은 스킨인 경우\n{\n \"status\": 404,\n \"message\": \"유저가 갖고 있는 스킨이 아닙니다.\"\n}\n\n404 유저가 갖고 있지 않은 캐릭터인 경우\n{\n \"status\": 404,\n \"message\": \"유저가 갖고 있는 캐릭터가 아닙니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/character.ts",
    "groupTitle": "캐릭터"
  },
  {
    "type": "get",
    "url": "/api/courses/complete",
    "title": "완료한 코스 목록 조회",
    "version": "1.0.0",
    "name": "Complete",
    "group": "코스",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "courses",
            "description": "<p>완료한 코스 목록</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>코스 인덱싱 아이디 (코스 고유 아이디 아님)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "situation",
            "description": "<p>코스 진행 상태 (항상 완료 상태인 2)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "property",
            "description": "<p>코스 속성 (1 ~ 7 -&gt; 자세한 목록은 추후 슬랙에 공지)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>코스 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>코스 설명</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalDays",
            "description": "<p>코스 총 날짜 수</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": "<p>코스를 완료한 년도</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": "<p>코스를 완료한 월</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>코스를 완료한 일</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "challenges",
            "description": "<p>해당 코스의 챌린지 목록</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>챌린지 날짜</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "202 완료한 코스가 없을 때\n{\n \"status\": 202,\n \"data\": {\n   \"courses\": [],\n }\n}\n\n200 완료한 코스가 있을 때\n{\n \"status\": 200,\n \"data\": {\n   \"courses\": [\n     {\n       \"id\": 1,\n       \"situation\": 2,\n       \"property\": 3,\n       \"title\": \"나 돌아갈래\",\n       \"totalDays\": 7,\n       \"year\": \"2021\",\n       \"month\": \"09\",\n       \"date\": \"26\",\n       \"challenges\": [\n         {\n           \"day\": 1,\n           \"situation\": 2,\n           \"title\": \"교복 입은 사진 찾아보기\",\n           \"year\": \"2021\",\n           \"month\": \"09\",\n           \"date\": \"20\",\n         },\n         // ...\n       ]\n     },\n     // ...\n   ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 존재하지 않는 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/course.ts",
    "groupTitle": "코스"
  },
  {
    "type": "get",
    "url": "/api/courses",
    "title": "코스 목록 조회",
    "version": "1.0.0",
    "name": "Library",
    "group": "코스",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isProgress",
            "description": "<p>유저가 현재 진행하고 있는 코스가 존재하는지 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "courses",
            "description": "<p>코스 목록들. 진행하지 않은 코스 -&gt; 완료한 코스 순서로 보냄</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>코스 아이디</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "situation",
            "description": "<p>코스 진행 상태 (0: 진행 전, 2: 완료)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "property",
            "description": "<p>코스 속성 (1 ~ 7 -&gt; 자세한 목록은 추후 슬랙에 공지)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>코스 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>코스 설명</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalDays",
            "description": "<p>코스 총 날짜 수</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 코스 목록 조회 성공\n{\n \"status\": 200,\n \"data\": {\n   \"isProgress\": true,\n   \"courses\": [\n     {\n       \"id\": 1,\n       \"situation\": 0,\n       \"property\": 1,\n       \"title\": \"초보 사진가\",\n       \"description\": \"초보 사진가 설명\",\n       \"totalDays\": 7\n     },\n     // ...\n     {\n       \"id\": 7,\n       \"situation\": 2,\n       \"property\": 3,\n       \"title\": \"나 돌아갈래\",\n       \"description\": \"나 돌아갈래 설명\",\n       \"totalDays\": 7\n     },\n     // ...\n   ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 존재하지 않는 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/course.ts",
    "groupTitle": "코스"
  },
  {
    "type": "put",
    "url": "/api/courses/:courseId",
    "title": "코스 진행(변경)하기",
    "version": "1.0.0",
    "name": "StartCourse",
    "group": "코스",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isComplete",
            "description": "<p>챌린지 인증 상태</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isPenalty",
            "description": "<p>패널티 적용 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mainCharacterImg",
            "description": "<p>메인 뷰 상단 말풍선 속 캐릭터 이미지</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "popupCharacterImg",
            "description": "<p>챌린지 인증 팝업 캐릭터 이미지</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "course",
            "description": "<p>현재 진행 중인 코스</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>코스 아이디</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "situation",
            "description": "<p>코스 진행 상태 (1: 진행 중, 2: 완료)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "property",
            "description": "<p>코스 속성 (1 ~ 7 -&gt; 자세한 목록은 추후 슬랙에 공지)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>코스 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalDays",
            "description": "<p>코스 총 날짜 수</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "currentDay",
            "description": "<p>현재 진행 중인 챌린지 날짜</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": "<p>코스를 완료한 년도</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": "<p>코스를 완료한 월</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>코스를 완료한 일</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "challenges",
            "description": "<p>코스에 포함되어있는 챌린지들</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "day",
            "description": "<p>챌린지 날짜</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "happy",
            "description": "<p>챌린지 성공 시 제공되는 해피지수</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "beforeMent",
            "description": "<p>챌린지 수행 전 멘트</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "afterMent",
            "description": "<p>챌린지 수행 완료 멘트</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "badges",
            "description": "<p>해당 챌린지 완료 시 받을 수 있는 뱃지 이름 목록</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 코스 진행/변경 완료 (변경이라면 isPenalty : true)\n{\n \"status\": 200,\n \"data\": {\n   \"isComplete\": false,\n   \"isPenalty\": false,\n   \"mainCharacterImg\": \"url\",\n   \"popupCharacterImg\": \"url\",\n   \"course\": {\n     \"id\": 1,\n     \"situation\": 1,\n     \"property\": 1,\n     \"title\": \"초보 사진가\",\n     \"totalDays\": 7,\n     \"currentDay\": 1,\n     \"year\": \"\",\n     \"month\": \"\",\n     \"date\": \"\",\n     \"challenges\": [\n       {\n         \"day\": 1,\n         \"situation\": 1,\n         \"title\": \"하늘 사진 찍기\"\n         \"happy\": 12,\n         \"beforeMent\": \"난 몽글몽글한 구름들을 보면 기분이 좋아지더라~ 오늘 너희 동네의 하늘은 어때?\",\n         \"afterMent\": \"엇, 그 구름 약간 날 닮은 것 같은데!? 일부러 이런 구름 찍어온거야? 너~\",\n         \"year\": \"\",\n         \"month\": \"\",\n         \"date\": \"\",\n         \"badges\": [\n           \"성장한 챌린저\",\n           \"모행 홀릭 챌린저\"\n         ]\n       },\n       // ...\n     ]\n   }\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 존재하지 않는 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n404 존재하지 않는 코스\n{\n \"status\": 404,\n \"message\": \"해당 id의 코스가 존재하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/course.ts",
    "groupTitle": "코스"
  },
  {
    "type": "put",
    "url": "/api/profile",
    "title": "닉네임 변경",
    "version": "1.0.0",
    "name": "changeNickname",
    "group": "프로필",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"nickname\": \"시원뿡\"\n}",
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
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n404 닉네임 글자 제한\n{\n \"status\": 404,\n \"message\": \"닉네임은 1-6글자 이내로 작성해주세요\"\n}\n\n404 닉네임 중복\n{\n \"status\": 404,\n \"message\": \"이미 사용 중인 닉네임입니다.\"\n}\n\n404 이전과 같은 닉네임\n{\n \"status\": 404,\n \"message\": \"기존 닉네임과 다른 닉네임으로 설정해주세요.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/profile.ts",
    "groupTitle": "프로필"
  },
  {
    "type": "get",
    "url": "/api/profile",
    "title": "마이페이지 조회",
    "version": "1.0.0",
    "name": "myPage",
    "group": "프로필",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n \"Bearer\": \"jwt\"\n}",
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
            "field": "nickname",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "completeCourseCount",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "completeChallengeCount",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "feedCount",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "badgeCount",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "calendar",
            "description": "<p>//하단부터 Object 속성</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "property",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "date",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"data\": {\n   \"nickname\": \"모행\",\n   \"email\": \"mohaeng@gmail.com\",\n   \"completeCourseCount\": 2,\n   \"completeChallengeCount\": 31,\n   \"feedCount\": 0,\n   \"badgeCount\": 2,\n   \"calendar\": [\n     {\n       \"property\": 1,\n       \"date\": [\n         \"2021-09-14\",\n         \"2021-09-16\",\n         \"2021-09-17\"\n       ]\n     },\n     {\n       \"property\": 1,\n       \"date\": [\n         \"2021-09-23\",\n         \"2021-09-25\",\n         \"2021-09-30\"\n       ]\n     },\n   ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 유효하지 않은 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}\n\n500 서버 에러\n{\n \"status\": 500,\n \"message\": \"서버 에러입니다. 서버 파트에게 문의해주세요 *^^*\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/profile.ts",
    "groupTitle": "프로필"
  },
  {
    "type": "get",
    "url": "/api/home",
    "title": "홈 조회",
    "version": "1.0.0",
    "name": "Home",
    "group": "홈",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\",\n \"Bearer\": \"{jwt}\"\n}",
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
            "field": "nickname",
            "description": "<p>유저 닉네임</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>유저 레벨</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "happy",
            "description": "<p>현재 유저 해피 지수</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "fullHappy",
            "description": "<p>현재 레벨에서 채워야 할 max 해피지수</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "characterLottie",
            "description": "<p>유저 캐릭터/카드에 맞는 로티 url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "characterSkin",
            "description": "<p>유저 캐릭터 스킨 이미지 url</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isStyleNew",
            "description": "<p>새로운 스타일을 받았는지 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isBadgeNew",
            "description": "<p>새로운 뱃지를 받았는지 여부</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "challengeTitle",
            "description": "<p>현재 진행하고 있는 챌린지 제목</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "percent",
            "description": "<p>코스 진행 현황 퍼센트</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 코스 진행 전\n{\n \"status\": 200,\n \"data\": {\n   \"nicknema\": \"모행\",\n   \"level\": 15,\n   \"happy\": 24,\n   \"fullHappy\": 90,\n   \"characterLottie\": \"bear.url\",\n   \"characterSkin\": \"image.url\",\n   \"isStyleNew\": false,\n   \"isBadgeNew\": false,\n   \"course\": {},\n }\n}\n\n200 코스 진행 중\n{\n \"status\": 200,\n \"data\": {\n   \"nicknema\": \"모행\",\n   \"level\": 15,\n   \"happy\": 24,\n   \"fullHappy\": 90,\n   \"characterLottie\": \"bear.url\",\n   \"characterSkin\": \"image.url\",\n   \"isStyleNew\": false,\n   \"isBadgeNew\": false,\n   \"course\": {\n     \"challengeTitle\": \"하늘 사진 찍기\",\n     \"percent\": 14,\n   },\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "401 존재하지 않는 유저\n{\n \"status\": 401,\n \"message\": \"유저가 존재하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/docs/home.ts",
    "groupTitle": "홈"
  }
] });
