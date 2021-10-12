import express from "express";
import axios from "axios";
import qs from "qs";
import { check, validationResult } from "express-validator";
import config from "../config";
import { SignUpRequestDTO } from "../dto/Auth/SignUp/request/SignUpRequestDTO";
import { SignInRequestDTO } from "../dto/Auth/SignIn/request/SignInRequestDTO";
import { SocialLogInRequestDTO } from "../dto/Auth/Social/request/SocialLogInRequestDTO";
import authService from "../service/authService";
import verifyFCM from "../middleware/verifyToken";
import { CheckEmailRequestDTO } from "../dto/Auth/Password/request/CheckEmailRequestDTO";
import { ChangePasswordRequestDTO } from "../dto/Auth/Password/request/ChangePasswordRequestDTO";
import { serverError } from "../errors";

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
  } = req.body;

  const requestDTO: SignUpRequestDTO = {
    email: email,
    password: password,
    nickname: nickname,
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

router.post("/password", async (req, res) => {
  const requestDTO: CheckEmailRequestDTO = {
    email: req.body.email
  }
  const result = await authService.forgetPassword(requestDTO);
  res.status(result.status).json(result);
});

router.put(
  "/password", 
  [
    check("email", "이메일 형식이 올바르지 않습니다").trim().isEmail(),
    check("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().not().isAlpha(),
    check("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().not().isNumeric(),
    check("password", "영문, 숫자를 모두 포함하여 입력해주세요").trim().isAlphanumeric(),
    check("password", "8-16자의 비밀번호를 입력해주세요").trim().isLength({ min: 8, max: 16 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(412).json({ 
        status: 412,
        message: errors.array()[0].msg
      });
    }

    const requestDTO: ChangePasswordRequestDTO = {
      email: req.body.email,
      password: req.body.password
    };

    const result = await authService.change(requestDTO);
    res.status(result.status).json(result);
  });

router.get("/kakao", async (req, res) => {
  try{
  const REST_API_KEY = config.kakaoRestAPIKey;
  const REDIRECT_URI = config.redirectUri;
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  res.redirect(kakaoAuthUrl);
  } catch (err) {
    console.log(err);
    return serverError;
  }
})

router.get("/kakao/callback", async (req, res) => {
  try{
    const token = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:qs.stringify({
        grant_type: 'authorization_code',
        client_id: config.kakaoRestAPIKey,
        redirectUri: config.redirectUri,
        code: req.query.code,
      })
    });

  } catch (err) {
    console.log(err);
    return serverError;
  }
  const result = await authService.kakao();
  res.status(result.status).json(result);
})

router.post("/nickname", verifyFCM, async (req, res) => {
  try{
    const { nickname, token } = req.body;
    const requestDTO: SocialLogInRequestDTO = {
      nickname: nickname,
      token: token
    };
    const result = await authService.nickname(requestDTO);
    res.status(result.status).json(result);
  } catch (err) {
    console.log(err);
    return serverError;
  }
})

module.exports = router;


