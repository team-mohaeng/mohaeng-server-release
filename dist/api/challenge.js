"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const challengeService_1 = __importDefault(require("../service/challengeService"));
const router = express_1.default.Router();
router.get("/", auth_1.default, async (req, res) => {
    const result = await challengeService_1.default.today(req.body.user.id);
    res.status(result.status).json(result);
});
module.exports = router;
//# sourceMappingURL=challenge.js.map