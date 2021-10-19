import express from "express";
import { SetCharacterRequestDTO } from "../dto/Character/Set/request/SetCharacterRequestDTO";
import characterService from "../service/characterService";
import auth from "../middleware/auth";
import { invalidParameter } from "../errors";

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

router.get("/:client", auth, async (req, res) => {
  const client = req.params.client;
  if (client != "aos" && client != "ios") {
    return invalidParameter;  
  }
  const result = await characterService.getCharacter(req.body.user.id, client);
  res.status(result.status).json(result);
})

module.exports = router;
