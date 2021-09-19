import express from "express";
import auth from "../middleware/auth";
import challengeService from '../service/challengeService';

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const result = await challengeService.today(req.body.user.id);
  res.status(result.status).json(result);
});

module.exports = router;