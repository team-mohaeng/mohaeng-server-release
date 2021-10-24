import express from "express";
import { check, validationResult } from "express-validator";
import authService from "../service/authService";
import { SignUpRequestDTO } from "../dto/Auth/SignUp/request/SignUpRequestDTO";
import { SignInRequestDTO } from "../dto/Auth/SignIn/request/SignInRequestDTO";
import { SocialSignUpRequestDTO } from "../dto/Auth/Social/request/SocialSignUpRequestDTO";
import { SocialLogInRequestDTO } from "../dto/Auth/Social/request/SocialLogInRequestDTO";
import { CheckEmailRequestDTO } from "../dto/Auth/Password/request/CheckEmailRequestDTO";
import { ChangePasswordRequestDTO } from "../dto/Auth/Password/request/ChangePasswordRequestDTO";
import auth from "../middleware/auth";
import apple from "../middleware/apple";
import kakao from "../middleware/kakao";
import google from "../middleware/google";
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

router.get("/password/:email", async (req, res) => {
  const requestDTO: CheckEmailRequestDTO = {
    email: req.params.email
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

router.post("/apple/signup", apple, async (req, res) => { 
  try{
    const requestDTO: SocialSignUpRequestDTO = {
      nickname: req.body.nickname,
      sub: req.body.sub,
      token: req.header("token")
    };
    const result = await authService.socialSignUp(requestDTO);
    res.status(result.status).json(result);
  } catch (err) {
    console.log(err);
    return serverError;
  }
})

router.post("/apple", apple, async (req, res) => { 
  try{
    const requestDTO: SocialLogInRequestDTO = {
      sub: req.body.sub,
      token: req.header("token")
    };
    const result = await authService.social(requestDTO);
    res.status(result.status).json(result);
  } catch (err) {
    console.log(err);
    return serverError;
  }
})

router.post("/google/signup", google, async (req, res) => { 
  try{
    const requestDTO: SocialSignUpRequestDTO = {
      nickname: req.body.nickname,
      sub: req.body.sub,
      token: req.header("token")
    };
    const result = await authService.socialSignUp(requestDTO);
    res.status(result.status).json(result);
  } catch (err) {
    console.log(err);
    return serverError;
  }
})

router.post("/google", google, async (req, res) => { 
  try{
    const requestDTO: SocialLogInRequestDTO = {
      sub: req.body.sub,
      token: req.header("token")
    };
    const result = await authService.social(requestDTO);
    res.status(result.status).json(result);
  } catch (err) {
    console.log(err);
    return serverError;
  }
})

router.post("/kakao/signup", kakao, async (req, res) => {
  try{
    const requestDTO: SocialSignUpRequestDTO = {
      nickname: req.body.nickname,
      sub: req.body.token.id,
      token: req.header("token")
    }
    const result = await authService.socialSignUp(requestDTO);
    res.status(result.status).json(result);
  } catch (err) {
    console.log(err);
    return serverError;
  }
})

router.post("/kakao", kakao, async (req, res) => {
  try{
    const requestDTO: SocialLogInRequestDTO = {
      sub: req.body.token.id,
      token: req.header("token")
    }
    const result = await authService.social(requestDTO);
    res.status(result.status).json(result);
  } catch (err) {
    console.log(err);
    return serverError;
  }
})

router.delete("/delete", auth, async (req, res) => {
  try{
    const result = await authService.delete(req.body.user.id);
    res.status(result.status).json(result);
  } catch (err) {
    console.log(err);
    return serverError;
  }
})



module.exports = router;


