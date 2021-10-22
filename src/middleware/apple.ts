import axios from "axios";
import jwt from "jsonwebtoken";
import { invalidToken, notExistToken, serverError } from "../errors";
const NodeRSA = require('node-rsa');

//Get public key
export default async(req, res, next) => {
  try{
    const idToken = req.header("idToken");
    if (!idToken) {
      return notExistToken;
    }
    const result = await axios.request({
      method: "GET",
      url: "https://appleid.apple.com/auth/keys",
    })
    const key = result.data;
    const jwtClaims = verifyIdToken(key, idToken);
    jwtClaims
    .then((token) => { 
      const sub = token.sub
      req.body.sub = sub;
      next();
    })
    .catch((err) => {
      console.log(err);
      return invalidToken;
    })
  }
  catch (err) {
    console.log(err);
    return serverError;
  }
};
//Decryption of id'u token by public key and rs256 algorithm
async function verifyIdToken(key, idToken) { //id_token, client_id
    const keys = key.keys[0]
    const publicKey = new NodeRSA();
    publicKey.importKey({ n: Buffer.from(keys.n, 'base64'), e: Buffer.from(keys.e, 'base64') }, 'components-public');
    const applePublicKey = publicKey.exportKey(['public'])
    const jwtClaims = jwt.verify(idToken, applePublicKey, { algorithms: 'RS256' });
    return jwtClaims;
};