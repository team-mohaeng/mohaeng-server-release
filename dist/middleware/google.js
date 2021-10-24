"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const errors_1 = require("../errors");
const { OAuth2Client } = require('google-auth-library');
exports.default = async (req, res, next) => {
    try {
        const client = new OAuth2Client(config_1.default.googleClientId);
        const idToken = req.header("idToken");
        if (!idToken) {
            res.status(errors_1.notExistToken.status).json(errors_1.notExistToken);
        }
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: config_1.default.googleClientId,
        });
        const payload = ticket.getPayload();
        req.body.sub = payload['sub'];
        next();
    }
    catch (err) {
        console.log(err);
        res.status(errors_1.invalidToken.status).json(errors_1.invalidToken);
    }
};
//# sourceMappingURL=google.js.map