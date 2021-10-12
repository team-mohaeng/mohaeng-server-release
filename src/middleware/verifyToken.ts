import * as admin from 'firebase-admin';
import { notExistToken, invalidToken } from "../errors";

export default (req, next) => {
  // Get token from header
  const token = req.header("token");

  // Check if not token
  if (!token) {
    return notExistToken;
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
    return invalidToken;
  });

};