import axios from "axios";
import { TOKEN_ERROR_MESSAGE } from "../constant";
import { invalidEmail, invalidToken, notExistToken } from "../errors";

export default async (req, res, next) => {
  // Get token from header
  const token = req.header("Bearer");

  // Check if not token
  if (!token) {
    return notExistToken;
  }

  // Verify token
  try {
    await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v1/user/access_token_info",
      headers:{
        'Authorization':`Bearer ${token}`
      }
    });
    next();
  } catch (err) {
    return invalidToken;
  }
};