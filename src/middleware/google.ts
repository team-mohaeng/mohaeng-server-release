import config from "../config";
import { invalidToken, notExistToken } from "../errors";
const {OAuth2Client} = require('google-auth-library');

export default async(req, res, next) => {
  try {
    const client = new OAuth2Client(config.googleClientId);
    const idToken = req.header("idToken");
    if (!idToken) {
      res.status(notExistToken.status).json(notExistToken);
    }
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: config.googleClientId, 
    });
    const payload = ticket.getPayload();
    req.body.sub = payload['sub'];
    next();
  } catch (err) {
    console.log(err);
    res.status(invalidToken.status).json(invalidToken);
  }
  
}