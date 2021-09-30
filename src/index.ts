import express from "express";
import path from "path";
import sequelize from './models';
import * as admin from 'firebase-admin';
import config from "./config"
import schedule from "node-schedule";
import dayjs from "dayjs";
import courseInit from './controller/courseInit';

const app = express();
const apidocPath = path.join(__dirname, "../apidoc");
var serviceAccount = require("../mohaeng.json");

//시퀄라이즈
sequelize.authenticate()
    .then(() => {
        console.log('DB Connected.');
    }).catch((err) => {
        console.error(err);
    });

//파이어베이스 auth
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: config.firebaseID,
  databaseURL: config.firebaseDB
});

// 초기화 부분
const init = schedule.scheduleJob('0 0 5 * * *', async function () {
  let date = new Date();
  console.log(
    `시작 시각 ${dayjs(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format(
      'YYYY-MM-DD hh:mm:ss'
    )} 입니다.`
  );

  // 코스 초기화
  await courseInit.init();
  // 피드 초기화

  console.log(
    `종료 시각 ${dayjs(date.toLocaleString('en', { timeZone: 'Asia/Seoul' })).format(
      'YYYY-MM-DD hh:mm:ss'
    )} 입니다.`
  );
});
  
app.use(express.json());
app.use("/apidoc", express.static(apidocPath));

app.use("/api/profile", require("./api/profile"));
app.use("/api/feed", require("./api/feed"));
app.use("/api/courses", require("./api/course"));
app.use("/api", require("./api/auth"));
app.use("/api/today", require("./api/challenge"));
app.use("/api/character", require("./api/character"));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
  res.render("error");
});

app
  .listen(5000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
