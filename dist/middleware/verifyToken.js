"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const errors_1 = require("../errors");
exports.default = (req, next) => {
    // Get token from header
    const token = req.header("token");
    // Check if not token
    if (!token) {
        return errors_1.notExistToken;
    }
    // Verify token
    admin
        .auth()
        .verifyIdToken(token)
        .then(() => {
        req.body = token;
        next();
    })
        .catch((error) => {
        console.log(error);
        return errors_1.invalidToken;
    });
};
//# sourceMappingURL=verifyToken.js.map