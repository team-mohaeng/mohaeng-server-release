import express from "express";
import { check, validationResult } from "express-validator";
import { SignUpRequestDTO } from "../dto/Auth/SignUp/request/SignUpRequestDTO";
import { SignInRequestDTO } from "../dto/Auth/SignIn/request/SignInRequestDTO";
import authService from "../service/authService";

const router = express.Router();

router.post("/signup",
[
  check("email", "이메일 형식이 올바르지 않습니다").trim().isEmail(),
  check("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().not().isAlpha(),
  check("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().not().isNumeric(),
  check("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().isAlphanumeric(),
  check("password", "8-16자의 비밀번호를 입력해주세요").trim().isLength({ min: 8, max: 16 }),
  check("nickname", "닉네임은 1~6글자 이내로 작성해주세요").trim().isLength({ min: 1, max: 6 }),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(412).json({ 
      status: 412,
      message: errors.array()[0].msg
    });
  }

  const {
    email,
    password,
    nickname,
    gender,
    birth_year
  } = req.body;

  const requestDTO: SignUpRequestDTO = {
    email: email,
    password: password,
    nickname: nickname,
    gender: gender,
    birth_year: birth_year
  };
  const result = await authService.signUp(requestDTO);
  res.status(result.status).json(result);
})


router.post("/signin", async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const requestDTO: SignInRequestDTO = {
    email: email,
    password: password,
  };
  const result = await authService.signIn(requestDTO);
  res.status(result.status).json(result);
})


module.exports = router;


