import express from "express";
import courseService from "../service/courseService";
// import auth from "../middleware/auth";

const router = express.Router();

router.get("/:id", async(req, res) => {
  const result = await courseService.library(req.params.id);
  res.status(result.status).json(result);
});

router.get("/complete/:id", async (req, res) => {
  const result = await courseService.complete(req.params.id);
  res.status(result.status).json(result);
});

module.exports = router;