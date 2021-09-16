import express from "express";
import { feedCreateRequestDTO } from "../dto/Feed/request/feedCreateRequestDTO";
import { AddEmojiRequestDTO } from "../dto/Feed/Emoji/request/AddEmojiRequestDTO";
import { DeleteEmojiRequestDTO } from "../dto/Feed/Emoji/request/DeleteEmojiRequestDTO";
import feedService from "../service/feedService";
import auth from "../middleware/auth";
import upload from "../modules/upload";

const router = express.Router();

router.post("/", upload.single('image'), auth, async (req, res) => {
  let image;
  if ((req as any).file) {
    image = (req as any).file.location;
  }
  else {
    image = ""
  }
  const feedParams = JSON.parse(req.body.feed);
  const { mood, content, isPrivate } = feedParams;
  const requestDTO: feedCreateRequestDTO = {
    mood: mood,
    content: content,
    image: image,
    isPrivate: isPrivate
  }
  const result = await feedService.create(req.body.user.id, requestDTO);
  res.status(result.status).json(result);
})

router.post("/:id", auth, async (req, res) => {
  const result = await feedService.delete(req.body.user.id, req.params.id);
  res.status(result.status).json(result);
})

router.put("/emoji/:id", auth, async (req, res) => {
  const { emojiId } = req.body;
  const requestDTO: AddEmojiRequestDTO = {
    emojiId: emojiId
  }
  const result = await feedService.emoji(req.body.user.id, req.params.id, requestDTO);
  res.status(result.status).json(result);
})

router.delete("/emoji/:id", auth, async (req, res) => {
  const { emojiId } = req.body;
  const requestDTO: DeleteEmojiRequestDTO = {
    emojiId: emojiId
  }
  const result = await feedService.deleteEmoji(req.body.user.id, req.params.id, requestDTO);
  res.status(result.status).json(result);
})

module.exports = router;