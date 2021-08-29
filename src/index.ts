import express from "express";
import path from "path";
import sequelize from './models';

const app = express();
const apidocPath = path.join(__dirname, "../apidoc");

sequelize.authenticate()
    .then(() => {
        console.log('DB Connected.');
    }).catch((err) => {
        console.error(err);
    });

app.use(express.json());
app.use("/apidoc", express.static(apidocPath));


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
