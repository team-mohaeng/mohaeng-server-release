import express from "express";
import auth from "../middleware/auth";
import challengeService from '../service/challengeService';

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const result = await challengeService.today(req.body.user.id, req.header("client"));
  res.status(result.status).json(result);
});

router.put("/:courseId/:challengeId", auth, async (req, res) => {
  const result = await challengeService.certification(req.body.user.id, req.params.courseId, req.params.challengeId, req.header("client"));
  res.status(result.status).json(result);
});

module.exports = router;