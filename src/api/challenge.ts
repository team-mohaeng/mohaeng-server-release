import express from "express";
import auth from "../middleware/auth";
import challengeService from '../service/challengeService';
import courseService from '../service/courseService';

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const result = await challengeService.today(req.body.user.id);
  res.status(result.status).json(result);
});

router.put("/:courseId/:challengeId", auth, async (req, res) => {
  const result = await challengeService.certification(req.body.user.id, req.params.courseId, req.params.challengeId);
  res.status(result.status).json(result);
});

module.exports = router;