import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
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
  firebaseDB: process.env.FIREBASE_DB

};

export const smtpTransport = nodemailer.createTransport({
  service: "naver",
  host: "smtp.naver.com",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PW,
  },
  tls: {
    rejectUnauthorized: false
  }
});