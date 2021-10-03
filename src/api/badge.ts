import express from "express";
import badgeService from "../service/badgeService";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const result = await badgeService.badge(req.body.user.id);
  res.status(result.status).json(result);
})

module.exports = router;