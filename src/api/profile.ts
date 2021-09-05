import express from "express";
import { ChangeNicknameRequestDTO } from "../dto/MyPage/nickname/request/ChangeNicknameRequestDto";
import profileService from "../service/profileService";

const router = express.Router();

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const nickname = req.body.nickname;
  const requestDTO: ChangeNicknameRequestDTO = {
    nickname: nickname
  };
  const result = await profileService.changeNickname(id, requestDTO);
  res.status(result.status).json(result);
})

module.exports = router;
