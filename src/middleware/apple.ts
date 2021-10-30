import axios from "axios";
import jwt from "jsonwebtoken";
import { invalidToken, notExistToken } from "../errors";
const NodeRSA = require('node-rsa');

//Get public key
export default async(req, res, next) => {
  const idToken = req.header("idToken");
  if (!idToken) {
    res.status(notExistToken.status).json(notExistToken);
  }
  const result = await axios.request({
    method: "GET",
    url: "https://appleid.apple.com/auth/keys",
  })
  const data = result.data;
  const jwtClaims = verifyIdToken(data, idToken);
  jwtClaims
  .then((token) => { 
    const sub = token.sub
    req.body.sub = sub;
    next();
  })
  .catch((err) => {
    console.log(err);
    res.status(invalidToken.status).json(invalidToken);
  })
};
//Decryption of id'u token by public key and rs256 algorithm
async function verifyIdToken(data, idToken) { //id_token, client_id
    const decodedToken = jwt.decode(idToken, { complete: true });
    const keys = data.keys;
    const key = keys.find(k => k.kid === decodedToken.header.kid);
    const publicKey = new NodeRSA();
    publicKey.importKey({ n: Buffer.from(key.n, 'base64'), e: Buffer.from(key.e, 'base64') }, 'components-public');
    const applePublicKey = publicKey.exportKey(['public'])
    const jwtClaims = jwt.verify(idToken, applePublicKey, { algorithms: ['RS256'] });
    return jwtClaims;
};


/*
import jwt from "jsonwebtoken";
import { invalidToken, notExistToken } from "../errors";

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
*/