"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const models_1 = __importDefault(require("./models"));
const admin = __importStar(require("firebase-admin"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const apidocPath = path_1.default.join(__dirname, "../apidoc");
var serviceAccount = require("../mohaeng.json");
//시퀄라이즈
models_1.default.authenticate()
    .then(() => {
    console.log('DB Connected.');
}).catch((err) => {
    console.error(err);
});
//파이어베이스 auth
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: config_1.default.firebaseID,
    databaseURL: config_1.default.firebaseDB
});
app.use(express_1.default.json());
app.use("/apidoc", express_1.default.static(apidocPath));
app.use("/api/profile", require("./api/profile"));
app.use("/api/feed", require("./api/feed"));
app.use("/api/courses", require("./api/course"));
app.use("/api", require("./api/auth"));
app.use("/api/today", require("./api/challenge"));
app.use("/api/character", require("./api/character"));
app.use("/api/badge", require("./api/badge"));
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
//# sourceMappingURL=index.js.map