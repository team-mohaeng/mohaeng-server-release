import * as admin from 'firebase-admin';
import { notGetToken, expiredToken } from "../errors";

export default (req, next) => {
  // Get token from header
  const token = req.header("fcm");

  // Check if not token
  if (!token) {
    return notGetToken
  }

  // Verify token
  admin
  .auth()
  .verifyIdToken(token)
  .then(() => {
    req.body = token;
    next();
  })
  .catch((error) => {
    console.log(error);
    return expiredToken
  });

};