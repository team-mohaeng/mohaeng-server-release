"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileService_1 = __importDefault(require("../service/profileService"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.put("/", auth_1.default, async (req, res) => {
    const nickname = req.body.nickname;
    const requestDTO = {
        nickname: nickname
    };
    const result = await profileService_1.default.changeNickname(req.body.user.id, requestDTO);
    res.status(result.status).json(result);
});
module.exports = router;
//# sourceMappingURL=profile.js.map