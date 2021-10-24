"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const password_1 = __importDefault(require("../controller/password"));
const User_1 = require("../models/User");
const Character_1 = require("../models/Character");
const Skin_1 = require("../models/Skin");
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
            //User 생성
            const user = await User_1.User.create({
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
            Character_1.Character.create({
                user_id: user.id,
            });
            Skin_1.Skin.create({
                user_id: user.id,
            });
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
    },
    forgetPassword: async (dto) => {
        try {
            const { email } = dto;
            const user = await User_1.User.findOne({ where: { email: email } });
            if (!user) {
                return errors_1.notExistUser;
            }
            const number = await password_1.default.email(email);
            if (!number) {
                return errors_1.invalidEmail;
            }
            const responseDTO = {
                status: 200,
                data: {
                    number: number,
                }
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
    change: async (dto) => {
        try {
            const { email, password } = dto;
            const user = await User_1.User.findOne({ where: { email: email } });
            if (!user) {
                return errors_1.notExistUser;
            }
            const salt = await bcryptjs_1.default.genSalt(10);
            user.password = await bcryptjs_1.default.hash(password, salt);
            User_1.User.update({
                password: user.password
            }, {
                where: { email: email }
            });
            const responseDTO = {
                status: 200,
                message: "비밀번호 바꾸기를 성공하였습니다."
            };
            return responseDTO;
        }
        catch (err) {
            console.log(err);
            return errors_1.serverError;
        }
    },
    socialSignUp: async (dto) => {
        try {
            const { nickname, sub, token } = dto;
            if (nickname.length > 6 || nickname.length == 0) {
                return errors_1.nicknameLengthCheck;
            }
            const hasNickname = await User_1.User.findOne({ attributes: ['nickname'], where: { nickname: nickname } });
            if (hasNickname) {
                return errors_1.alreadyExistNickname;
            }
            const isSignedUp = await User_1.User.findOne({ attributes: ['sub'], where: { sub: sub } });
            if (isSignedUp) {
                return errors_1.alreadySignedUp;
            }
            const user = await User_1.User.create({
                nickname: nickname,
                sub: sub,
                token: token,
            });
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const jwtToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret);
            Character_1.Character.create({
                user_id: user.id,
            });
            Skin_1.Skin.create({
                user_id: user.id,
            });
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
    social: async (dto) => {
        try {
            const { sub, token } = dto;
            let responseDTO;
            let data;
            const user = await User_1.User.findOne({ where: { sub: sub } });
            if (!user) {
                data = {
                    user: false
                };
                responseDTO = {
                    status: 200,
                    data: data
                };
                return responseDTO;
            }
            else {
                User_1.User.update({ token: token }, { where: { sub: sub } });
            }
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const jwtToken = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret);
            data = {
                user: true,
                jwt: jwtToken
            };
            responseDTO = {
                status: 200,
                data: data
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
    delete: async (id) => {
        try {
            const user = await User_1.User.findOne({ attributes: ['id'], where: { id: id } });
            if (!user) {
                return errors_1.notExistUser;
            }
            User_1.User.destroy({ where: { id: id } });
            const responseDTO = {
                status: 200,
                message: "계정을 삭제하였습니다."
            };
            return responseDTO;
        }
        catch (err) {
            console.error(err);
            return errors_1.serverError;
        }
    },
};
//# sourceMappingURL=authService.js.map