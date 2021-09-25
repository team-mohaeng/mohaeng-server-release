define({ "api": [
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
  }
] });
