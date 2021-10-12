import express from "express";
import auth from "../middleware/auth";
import messageService from '../service/messageService';

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const result = await messageService.chatting(req.body.user.id);
  res.status(result.status).json(result);
});

module.exports = router;