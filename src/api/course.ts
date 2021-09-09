import express from "express";
import courseService from "../service/courseService";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", auth, async(req, res) => {
  const result = await courseService.library(req.body.user.id);
  res.status(result.status).json(result);
});

router.get("/complete", auth, async (req, res) => {
  const result = await courseService.complete(req.body.user.id);
  res.status(result.status).json(result);
});

router.put("/:courseId", auth, async (req, res) => {
  const result = await courseService.start(req.body.user.id, req.params.courseId);
  res.status(result.status).json(result);
});

module.exports = router;