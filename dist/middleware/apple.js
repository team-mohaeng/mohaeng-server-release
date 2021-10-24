"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const NodeRSA = require('node-rsa');
//Get public key
exports.default = async (req, res, next) => {
    const idToken = req.header("idToken");
    if (!idToken) {
        res.status(errors_1.notExistToken.status).json(errors_1.notExistToken);
    }
    const result = await axios_1.default.request({
        method: "GET",
        url: "https://appleid.apple.com/auth/keys",
    });
    const key = result.data;
    const jwtClaims = verifyIdToken(key, idToken);
    jwtClaims
        .then((token) => {
        const sub = token.sub;
        req.body.sub = sub;
        next();
    })
        .catch((err) => {
        console.log(err);
        res.status(errors_1.invalidToken.status).json(errors_1.invalidToken);
    });
};
//Decryption of id'u token by public key and rs256 algorithm
async function verifyIdToken(key, idToken) {
    const keys = key.keys[0];
    const publicKey = new NodeRSA();
    publicKey.importKey({ n: Buffer.from(keys.n, 'base64'), e: Buffer.from(keys.e, 'base64') }, 'components-public');
    const applePublicKey = publicKey.exportKey(['public']);
    const jwtClaims = jsonwebtoken_1.default.verify(idToken, applePublicKey, { algorithms: 'RS256' });
    return jwtClaims;
}
;
//# sourceMappingURL=apple.js.map