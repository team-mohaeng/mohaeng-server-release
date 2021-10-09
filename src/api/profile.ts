import express from "express";
import { ChangeNicknameRequestDTO } from "../dto/Profile/Nickname/request/ChangeNicknameRequestDTO"
import profileService from "../service/profileService";
import auth from "../middleware/auth";

const router = express.Router();

router.put("/", auth, async (req, res) => {
  const nickname = req.body.nickname;
  const requestDTO: ChangeNicknameRequestDTO = {
    nickname: nickname
  };
  const result = await profileService.nickname(req.body.user.id, requestDTO);
  res.status(result.status).json(result);
})

router.get("/", auth, async (req, res) => {
  const result = await profileService.myPage(req.body.user.id);
  res.status(result.status).json(result);
})

module.exports = router;
