import express from "express";
import { SetCharacterRequestDTO } from "../dto/Character/Set/request/SetCharacterRequestDTO";
import characterService from "../service/characterService";
import auth from "../middleware/auth";

const router = express.Router();

router.put("/", auth, async (req, res) => {
  const { characterSkin, characterType, characterCard } = req.body;
  const requestDTO: SetCharacterRequestDTO = {
    characterSkin: characterSkin,
    characterType: characterType,
    characterCard: characterCard
  };
  const result = await characterService.setCharacter(req.body.user.id, requestDTO);
  res.status(result.status).json(result);
})

router.get("/", auth, async (req, res) => {
  const result = await characterService.getCharacter(req.body.user.id);
  res.status(result.status).json(result);
})

module.exports = router;
