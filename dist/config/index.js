"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFound = dotenv_1.default.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
    /**
     * That long string from mlab
     */
    deviceToken: process.env.deviceToken,
    /**
     * Your secret sauce
     */
    awsBucket: process.env.AWS_BUCKET,
    awsS3AccessKey: process.env.AWS_ACCESS_KEY,
    awsS3SecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    /**
     * Your secret sauce
     */
    firebaseID: process.env.FIREBASE_ID,
    firebaseDB: process.env.FIREBASE_DB,
    /**
     * Your secret sauce
     */
    kakaoRestAPIKey: process.env.REST_API_KEY,
    redirectUri: process.env.REDIRECT_URI,
};
//# sourceMappingURL=index.js.map