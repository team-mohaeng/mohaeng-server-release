# ![image](https://user-images.githubusercontent.com/71828832/146636698-76d9c6ee-99db-485b-a3c0-fb273ea7599c.png) 쟈니

![image](https://user-images.githubusercontent.com/71828832/146636702-bc0f615f-1b7c-4369-96ea-b7e806b05285.png)

<center style="bold">
	<b>행복을 찾아주는 데일리 챌린지 앱, 모행(MOHAENG)</b><br/>
  <b>개발 기간: 2021.06.27 ~ 2021.12.10</b>
</center>


</div>
</details>
<br/>

## 서버 아키텍처
![125946680-985557a8-694f-4f49-aae2-400dcc30267c](https://user-images.githubusercontent.com/71828832/146637359-d124903c-2974-4549-91c1-c781ac8f7121.png)


## 기능 분담

| 김현지                                                       | 김기연                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ✔️ 메인 홈 조회<br />✔️ 회원가입<br />✔️ 로그인<br />✔️ 비밀번호 변경<br />✔️ 이메일로 인증번호 전송<br />✔️ 코스 목록 조회<br />✔️ 코스 진행(변경)하기<br />✔️ 완료된 코스 조회<br />✔️ 오늘의 챌린지 조회<br />✔️ 챌린지 인증하기<br />✔️ 진행 중인 코스 중 챌린지 진행상황 조회<br />✔️ ec2 환경설정<br />✔️ s3 환경설정<br />✔️ 푸시 알림<br />✔️ 푸시 알림 조회 | ✔️ 소셜 로그인<br />✔️ 이메일 중복 확인<br />✔️ 회원 탈퇴<br />✔️ 사용자 차단<br />✔️ 안부 작성하기<br />✔️ 안부 커뮤니티 조회<br />✔️ 내 서랍장 조회<br />✔️ 안부 이모지<br />✔️ 안부 삭제<br />✔️ 안부 신고<br />✔️ 달성한 뱃지 조회<br />✔️ 캐릭터 변경<br />✔️ 캐릭터 조회<br />✔️ 마이페이지 조회<br />✔️ 닉네임 변경<br />✔️ ec2 환경설정<br />✔️ s3 환경설정<br />✔️ RDS 환경설정<br /> |



## API 명세서

[모행 API 보러가기](http://54.180.103.98:5000/apidoc/)



## 의존성

```json
  "devDependencies": {
    "@types/node": "^16.9.6",
    "ts-node": "^10.2.1",
    "typescript": "^4.4.3"
  },
  "dependencies": {
    "@firebase/app": "^0.7.0",
    "@firebase/auth": "^0.17.2",
    "@types/serve-static": "^1.13.10",
    "acorn": "^8.5.0",
    "acorn-walk": "^8.2.0",
    "apidoc": "^0.29.0",
    "arg": "^4.1.3",
    "aws-sdk": "^2.987.0",
    "axios": "^0.24.0",
    "bcryptjs": "^2.4.3",
    "create-require": "^1.1.1",
    "diff": "^4.0.2",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "express-validator": "^6.12.1",
    "firebase-admin": "^9.11.1",
    "global": "^4.4.0",
    "google-auth-library": "^7.10.1",
    "jsonwebtoken": "^8.5.1",
    "make-error": "^1.3.6",
    "moment": "^2.29.1",
    "multer": "^1.4.3",
    "multer-s3": "^2.9.0",
    "mysql2": "^2.3.0",
    "node-rsa": "^1.1.1",
    "node-schedule": "^2.0.0",
    "nodemailer": "^6.7.0",
    "nodemon": "^2.0.12",
    "qs": "^6.10.1",
    "sequelize": "^6.6.5",
    "sequelize-cli": "^6.2.0",
    "yn": "^3.1.1"
  }
```



## 규칙

[Coding Convention](https://github.com/team-journey/journey-server/blob/develop/rules/Coding%20Convention.md)

[Commit Convention](https://github.com/team-journey/journey-server/blob/develop/rules/Commit%20Convention.md)

[Git Rule](https://github.com/team-journey/journey-server/blob/develop/rules/Git%20Rule.md)



## 배포

- AWS EC2
- AWS S3
- AWS RDS



## 도구

- [Node.js](https://github.com/nodejs/node)
- [Express.js](http://expressjs.com/)
- [Sequelize] (https://sequelize.org/)
- [YARN](https://yarnpkg.com/)
- [PM2](https://pm2.keymetrics.io/)
- [MySQL](https://www.mysql.com/)



## Contributor 🖤

| [김현지](https://github.com/khyunjiee) | ![image](https://user-images.githubusercontent.com/49138331/125947026-3a7e15de-00b9-4ff0-b3f9-fe55ac013b0e.png) | 더 잘해주지 못해서 미안하고,, 항상 고맙습니다 우리 기연이 🖤  |
| -------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [김기연](https://github.com/gamza55)   | ![기연이](https://user-images.githubusercontent.com/49138331/125946899-0d267268-c561-420b-996b-4578354a6b58.png) | 내가 더 많이 했어야 하는데... 나 알려주면서 개발까지 많이 하느라 고생많았어요!! 고마워 🖤 |
