"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const express_validator_1 = require("express-validator");
const config_1 = __importDefault(require("../config"));
const authService_1 = __importDefault(require("../service/authService"));
const errors_1 = require("../errors");
const router = express_1.default.Router();
router.post("/signup", [
    (0, express_validator_1.check)("email", "이메일 형식이 올바르지 않습니다").trim().isEmail(),
    (0, express_validator_1.check)("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().not().isAlpha(),
    (0, express_validator_1.check)("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().not().isNumeric(),
    (0, express_validator_1.check)("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().isAlphanumeric(),
    (0, express_validator_1.check)("password", "8-16자의 비밀번호를 입력해주세요").trim().isLength({ min: 8, max: 16 }),
    (0, express_validator_1.check)("nickname", "닉네임은 1~6글자 이내로 작성해주세요").trim().isLength({ min: 1, max: 6 }),
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(412).json({
            status: 412,
            message: errors.array()[0].msg
        });
    }
    const { email, password, nickname, } = req.body;
    const requestDTO = {
        email: email,
        password: password,
        nickname: nickname,
    };
    const result = await authService_1.default.signUp(requestDTO);
    res.status(result.status).json(result);
});
router.post("/signin", async (req, res) => {
    const { email, password, } = req.body;
    const requestDTO = {
        email: email,
        password: password,
    };
    const result = await authService_1.default.signIn(requestDTO);
    res.status(result.status).json(result);
});
router.get("/kakao", async (req, res) => {
    try {
        const REST_API_KEY = config_1.default.kakaoRestAPIKey;
        const REDIRECT_URI = config_1.default.redirectUri;
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
        res.redirect(kakaoAuthUrl);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
router.get("/kakao/callback", async (req, res) => {
    try {
        //토큰 유효성 검사
        const token = await (0, axios_1.default)({
            method: "POST",
            url: "https://kauth.kakao.com/oauth/token",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs_1.default.stringify({
                grant_type: 'authorization_code',
                client_id: config_1.default.kakaoRestAPIKey,
                redirectUri: config_1.default.redirectUri,
                code: req.query.code,
            })
        });
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
    const result = await authService_1.default.kakao();
    res.status(result.status).json(result);
});
router.post("/nickname", async (req, res) => {
    try {
        const nickname = req.body.nickname;
        const requestDTO = {
            nickname: nickname
        };
        const result = await authService_1.default.nickname(requestDTO);
        res.status(result.status).json(result);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
module.exports = router;
//# sourceMappingURL=auth.js.map