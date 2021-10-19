"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("../errors");
exports.default = async (req, res, next) => {
    // Get token from header
    const token = req.header("Bearer");
    // Check if not token
    if (!token) {
        return errors_1.notExistToken;
    }
    // Verify token
    try {
        await (0, axios_1.default)({
            method: "GET",
            url: "https://kapi.kakao.com/v1/user/access_token_info",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        next();
    }
    catch (err) {
        return errors_1.invalidToken;
    }
};
//# sourceMappingURL=kakao.js.map