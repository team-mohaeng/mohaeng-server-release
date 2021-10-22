"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authService_1 = __importDefault(require("../service/authService"));
const auth_1 = __importDefault(require("../middleware/auth"));
const apple_1 = __importDefault(require("../middleware/apple"));
const errors_1 = require("../errors");
const kakao_1 = __importDefault(require("../middleware/kakao"));
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
router.get("/password/:email", async (req, res) => {
    const requestDTO = {
        email: req.params.email
    };
    const result = await authService_1.default.forgetPassword(requestDTO);
    res.status(result.status).json(result);
});
router.put("/password", [
    (0, express_validator_1.check)("email", "이메일 형식이 올바르지 않습니다").trim().isEmail(),
    (0, express_validator_1.check)("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().not().isAlpha(),
    (0, express_validator_1.check)("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().not().isNumeric(),
    (0, express_validator_1.check)("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().isAlphanumeric(),
    (0, express_validator_1.check)("password", "8-16자의 비밀번호를 입력해주세요").trim().isLength({ min: 8, max: 16 }),
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(412).json({
            status: 412,
            message: errors.array()[0].msg
        });
    }
    const requestDTO = {
        email: req.body.email,
        password: req.body.password
    };
    const result = await authService_1.default.change(requestDTO);
    res.status(result.status).json(result);
});
router.post("/apple", apple_1.default, async (req, res) => {
    try {
        const { nickname, sub, token } = req.body;
        const requestDTO = {
            nickname: nickname,
            sub: sub,
            token: token
        };
        const result = await authService_1.default.social(requestDTO);
        res.status(result.status).json(result);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
router.post("/apple/login", apple_1.default, async (req, res) => {
    try {
        const { sub, token } = req.body;
        const requestDTO = {
            sub: sub,
            token: token
        };
        const result = await authService_1.default.socialLogIn(requestDTO);
        res.status(result.status).json(result);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
router.delete("/delete", auth_1.default, async (req, res) => {
    try {
        const result = await authService_1.default.delete(req.body.user.id);
        res.status(result.status).json(result);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
router.post("/kakao", kakao_1.default, async (req, res) => {
    try {
        const result = await authService_1.default.kakao();
        res.status(result.status).json(result);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
module.exports = router;
//# sourceMappingURL=auth.js.map