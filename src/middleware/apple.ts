import axios from "axios";
import jwt from "jsonwebtoken";
import { invalidToken, notExistToken } from "../errors";

//Get public key
export default async(req, res, next) => {
  const idToken = req.header("idToken");
  if (!idToken) {
    res.status(notExistToken.status).json(notExistToken);
  }
  try {
    const token = jwt.decode(idToken);
    const sub = token.sub
    req.body.sub = sub;
    next();
  } catch (err) {
    console.log(err);
    res.status(invalidToken.status).json(invalidToken);
  }
};