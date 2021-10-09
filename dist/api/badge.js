"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const badgeService_1 = __importDefault(require("../service/badgeService"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/", auth_1.default, async (req, res) => {
    const result = await badgeService_1.default.badge(req.body.user.id);
    res.status(result.status).json(result);
});
module.exports = router;
//# sourceMappingURL=badge.js.map