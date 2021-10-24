"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("../errors");
exports.default = async (req, res, next) => {
    // Get token from header
    const idToken = req.header("idToken");
    // Check if not token
    if (!idToken) {
        res.status(errors_1.notExistToken.status).json(errors_1.notExistToken);
    }
    // Verify token
    try {
        const token = await (0, axios_1.default)({
            method: "GET",
            url: "https://kapi.kakao.com/v1/user/access_token_info",
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        });
        req.body.token = token.data;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(errors_1.invalidToken.status).json(errors_1.invalidToken);
    }
};
//# sourceMappingURL=kakao.js.map