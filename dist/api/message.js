"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const messageService_1 = __importDefault(require("../service/messageService"));
const router = express_1.default.Router();
router.get("/", auth_1.default, async (req, res) => {
    const result = await messageService_1.default.chatting(req.body.user.id);
    res.status(result.status).json(result);
});
module.exports = router;
//# sourceMappingURL=message.js.map