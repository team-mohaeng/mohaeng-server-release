define({ "api": [
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
  }
] });
