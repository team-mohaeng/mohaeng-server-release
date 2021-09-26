"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseService_1 = __importDefault(require("../service/courseService"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/", auth_1.default, async (req, res) => {
    const result = await courseService_1.default.library(req.body.user.id);
    res.status(result.status).json(result);
});
router.get("/complete", auth_1.default, async (req, res) => {
    const result = await courseService_1.default.complete(req.body.user.id);
    res.status(result.status).json(result);
});
router.put("/:courseId", auth_1.default, async (req, res) => {
    const result = await courseService_1.default.start(req.body.user.id, req.params.courseId);
    res.status(result.status).json(result);
});
module.exports = router;
//# sourceMappingURL=course.js.map