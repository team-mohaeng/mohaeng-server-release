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
const kakao_1 = __importDefault(require("../middleware/kakao"));
const google_1 = __importDefault(require("../middleware/google"));
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
    if (!req.header("token")) {
        res.status(errors_1.notExistToken.status).json(errors_1.notExistToken);
    }
    const requestDTO = {
        email: email,
        password: password,
        nickname: nickname,
        token: req.header("token")
    };
    const result = await authService_1.default.signUp(requestDTO);
    res.status(result.status).json(result);
});
router.post("/signin", async (req, res) => {
    const { email, password, } = req.body;
    if (!req.header("token")) {
        res.status(errors_1.notExistToken.status).json(errors_1.notExistToken);
    }
    const requestDTO = {
        email: email,
        password: password,
        token: req.header("token")
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
router.post("/apple/signup", apple_1.default, async (req, res) => {
    try {
        const requestDTO = {
            nickname: req.body.nickname,
            sub: req.body.sub,
            token: req.header("token")
        };
        const result = await authService_1.default.socialSignUp(requestDTO);
        res.status(result.status).json(result);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
router.post("/apple", apple_1.default, async (req, res) => {
    try {
        const requestDTO = {
            sub: req.body.sub,
            token: req.header("token")
        };
        const result = await authService_1.default.social(requestDTO);
        res.status(result.status).json(result);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
router.post("/google/signup", google_1.default, async (req, res) => {
    try {
        const requestDTO = {
            nickname: req.body.nickname,
            sub: req.body.sub,
            token: req.header("token")
        };
        const result = await authService_1.default.socialSignUp(requestDTO);
        res.status(result.status).json(result);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
router.post("/google", google_1.default, async (req, res) => {
    try {
        const requestDTO = {
            sub: req.body.sub,
            token: req.header("token")
        };
        const result = await authService_1.default.social(requestDTO);
        res.status(result.status).json(result);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
router.post("/kakao/signup", kakao_1.default, async (req, res) => {
    try {
        const requestDTO = {
            nickname: req.body.nickname,
            sub: req.body.token.id,
            token: req.header("token")
        };
        const result = await authService_1.default.socialSignUp(requestDTO);
        res.status(result.status).json(result);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
router.post("/kakao", kakao_1.default, async (req, res) => {
    try {
        const requestDTO = {
            sub: req.body.token.id,
            token: req.header("token")
        };
        const result = await authService_1.default.social(requestDTO);
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
router.post("/email", async (req, res) => {
    try {
        const result = await authService_1.default.email(req.body.email);
        res.status(result.status).json(result);
    }
    catch (err) {
        console.log(err);
        return errors_1.serverError;
    }
});
router.post("/block", auth_1.default, async (req, res) => {
    const result = await authService_1.default.block(req.body.user.id, req.body.nickname);
    res.status(result.status).json(result);
});
module.exports = router;
//# sourceMappingURL=auth.js.map