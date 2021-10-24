import axios from "axios";
import { TOKEN_ERROR_MESSAGE } from "../constant";
import { invalidToken, notExistToken } from "../errors";

export default async (req, res, next) => {
  // Get token from header
  const idToken = req.header("idToken");

  // Check if not token
  if (!idToken) {
    res.status(notExistToken.status).json(notExistToken);
  }

  // Verify token
  try {
    const token = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v1/user/access_token_info",
      headers:{
        'Authorization':`Bearer ${idToken}`
      }
    });
    req.body.token = token.data;
    next();
  } catch (err) {
    console.log(err);
    res.status(invalidToken.status).json(invalidToken);
  }
};