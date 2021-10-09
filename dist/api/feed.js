"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedService_1 = __importDefault(require("../service/feedService"));
const auth_1 = __importDefault(require("../middleware/auth"));
const upload_1 = __importDefault(require("../modules/upload"));
const router = express_1.default.Router();
router.post("/", upload_1.default.single('image'), auth_1.default, async (req, res) => {
    let image;
    if (req.file) {
        image = req.file.location;
    }
    else {
        image = "";
    }
    const feedParams = JSON.parse(req.body.feed);
    const { mood, content, isPrivate } = feedParams;
    const requestDTO = {
        mood: mood,
        content: content,
        image: image,
        isPrivate: isPrivate
    };
    const result = await feedService_1.default.create(req.body.user.id, requestDTO);
    res.status(result.status).json(result);
});
router.delete("/:id", auth_1.default, async (req, res) => {
    const result = await feedService_1.default.delete(req.body.user.id, req.params.id);
    res.status(result.status).json(result);
});
router.put("/emoji/:id", auth_1.default, async (req, res) => {
    const { emojiId } = req.body;
    const requestDTO = {
        emojiId: emojiId
    };
    const result = await feedService_1.default.emoji(req.body.user.id, req.params.id, requestDTO);
    res.status(result.status).json(result);
});
router.delete("/emoji/:id", auth_1.default, async (req, res) => {
    const { emojiId } = req.body;
    const requestDTO = {
        emojiId: emojiId
    };
    const result = await feedService_1.default.deleteEmoji(req.body.user.id, req.params.id, requestDTO);
    res.status(result.status).json(result);
});
router.get("/:year/:month", auth_1.default, async (req, res) => {
    const result = await feedService_1.default.myFeed(req.body.user.id, req.params.year, req.params.month);
    res.status(result.status).json(result);
});
router.get("/", auth_1.default, async (req, res) => {
    const result = await feedService_1.default.feed(req.body.user.id);
    res.status(result.status).json(result);
});
router.post("/:id", auth_1.default, async (req, res) => {
    const result = await feedService_1.default.report(req.body.user.id, req.params.id);
    res.status(result.status).json(result);
});
module.exports = router;
//# sourceMappingURL=feed.js.map