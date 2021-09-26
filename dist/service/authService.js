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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const User_1 = require("../models/User");
const errors_1 = require("../errors");
exports.default = {
    signUp: async (dto) => {
        try {
            const { email, password, nickname } = dto;
            const userEmail = await User_1.User.findOne({ attributes: ['email'], where: { email: email } });
            if (userEmail) {
                return errors_1.alreadyExistEmail;
            }
            const userNickname = await User_1.User.findOne({ attributes: ['nickname'], where: { nickname: nickname } });
            if (userNickname) {
                return errors_1.alreadyExistNickname;
            }
            //비밀번호 암호화
            const salt = await bcryptjs_1.default.genSalt(10);
            const encryptedPassword = await bcryptjs_1.default.hash(password, salt);
            //firebase에 저장
            let uid;
            await (admin
                .auth()
                .createUser({
                email: email,
                disabled: false,
            })
                .then((userRecord) => {
                uid = userRecord.uid;
            })
                .catch((error) => {
                console.log(error);
            }));
            if (uid == null) {
                return errors_1.notExistUid;
            }
            //User 생성
            const user = await User_1.User.create({
                uid: uid,
                email: email,
                password: encryptedPassword,
                nickname: nickname,
            });
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const jwtToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret);
            const responseDTO = {
                status: 200,
                data: {
                    jwt: jwtToken,
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
    signIn: async (dto) => {
        try {
            const { email, password } = dto;
            const user = await User_1.User.findOne({ attributes: ['id', 'password'], where: { email: email } });
            if (!user) {
                return errors_1.notMatchSignIn;
            }
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return errors_1.notMatchSignIn;
            }
            //user.update -> firebase 토큰 추가 해주기
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const jwtToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret);
            const responseDTO = {
                status: 200,
                data: {
                    jwt: jwtToken
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    }
};
//# sourceMappingURL=authService.js.map