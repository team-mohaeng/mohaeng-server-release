import express from "express";
import auth from "../middleware/auth";
import homeService from '../service/homeService';

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const result = await homeService.home(req.body.user.id, req.header("client"));
  res.status(result.status).json(result);
});

module.exports = router;