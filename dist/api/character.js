"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const characterService_1 = __importDefault(require("../service/characterService"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.put("/", auth_1.default, async (req, res) => {
    const { characterSkin, characterType, characterCard } = req.body;
    const requestDTO = {
        characterSkin: characterSkin,
        characterType: characterType,
        characterCard: characterCard
    };
    const result = await characterService_1.default.setCharacter(req.body.user.id, requestDTO);
    res.status(result.status).json(result);
});
router.get("/:client", auth_1.default, async (req, res) => {
    const result = await characterService_1.default.getCharacter(req.body.user.id, req.params.client);
    res.status(result.status).json(result);
});
module.exports = router;
//# sourceMappingURL=character.js.map