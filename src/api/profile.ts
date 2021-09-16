import express from "express";
import { ChangeNicknameRequestDTO } from "../dto/Profile/nickname/request/ChangeNicknameRequestDto"
import profileService from "../service/profileService";
import auth from "../middleware/auth";

const router = express.Router();

router.put("/", auth, async (req, res) => {
  const nickname = req.body.nickname;
  const requestDTO: ChangeNicknameRequestDTO = {
    nickname: nickname
  };
  const result = await profileService.changeNickname(req.body.user.id, requestDTO);
  res.status(result.status).json(result);
})

module.exports = router;
