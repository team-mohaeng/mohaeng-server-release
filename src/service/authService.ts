import * as admin from 'firebase-admin';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config"
import { User } from "../models/User";
import { Character } from '../models/Character';
import { Skin } from '../models/Skin';
import { SignUpRequestDTO } from "../dto/Auth/SignUp/request/SignUpRequestDTO";
import { SignUpResponseDTO } from "../dto/Auth/SignUp/response/SignUpResponseDTO";
import { SignInRequestDTO } from '../dto/Auth/SignIn/request/SignInRequestDTO';
import { SignInResponseDTO } from '../dto/Auth/SignIn/response/SignInResponseDTO';
import { serverError, notExistUid, alreadyExistEmail, nicknameLengthCheck, alreadyExistNickname, notMatchSignIn } from "../errors";
import { KakaoResponseDTO } from '../dto/Auth/Kakao/response/KakaoResponseDTO';
import { KakaoRequestDTO } from '../dto/Auth/Kakao/request/KakaoRequestDTO';

export default {
  signUp: async (dto: SignUpRequestDTO) => {
    try{
      const { email, password, nickname } = dto;

      const userEmail = await User.findOne({ attributes: ['email'], where: {email: email} });
      if (userEmail) {
        return alreadyExistEmail;
      }

      const userNickname = await User.findOne({ attributes: ['nickname'], where: {nickname: nickname} });
      if (userNickname) {
        return alreadyExistNickname;
      }
      
      //비밀번호 암호화
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      //firebase에 저장
      let uid;
      await (admin
      .auth()
      .createUser({
        email: email,
        disabled: false,
      })
      .then((userRecord) => {
        uid = userRecord.uid;
      })
      .catch((error) => {
        console.log(error);
      })
      )
      
      if (uid == null) {
        return notExistUid;
      }
      
      //User 생성
      const user = await User.create({
        uid: uid,
        email: email,
        password: encryptedPassword,
        nickname: nickname,
      });

      const payload = {
        user: {
          id: user.id,
        },
      };

      const jwtToken = jwt.sign(
        payload,
        config.jwtSecret,
      );

      Character.create({
        user_id: user.id,
      });

      Skin.create({
        user_id: user.id,
      })

      const responseDTO: SignUpResponseDTO = {
        status: 200,
        data: {
          jwt: jwtToken,
        }
      }
      return responseDTO;

    } catch (err) {
      console.error(err);
      return serverError;
    }
  },

  signIn: async (dto: SignInRequestDTO) => {
    try{
      const { email, password } = dto;
      const user = await User.findOne({ attributes: ['id', 'password'], where: { email: email} });
      if (!user) {
        return notMatchSignIn;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return notMatchSignIn;
      }

      //user.update -> firebase 토큰 추가 해주기

      const payload = {
        user: {
          id: user.id,
        },
      };
      
      const jwtToken = jwt.sign(
        payload,
        config.jwtSecret,
      );

      const responseDTO: SignInResponseDTO = {
        status: 200,
        data: {
          jwt: jwtToken
        }
      }

      return responseDTO;
    } catch(err) {
      console.error(err);
      return serverError;
    }
  },

  kakao: async () => {
    try{
      const responseDTO: KakaoResponseDTO = {
        status: 200,
        message: "토큰 인증이 완료되었습니다."
      }
      return responseDTO;
    } catch (err) {
      console.error(err);
      return serverError;
    }
  },

  nickname: async (dto: KakaoRequestDTO) => {
    try{
      const { nickname, token } = dto;

      if ( nickname.length > 6 || nickname.length == 0 ) {
        return nicknameLengthCheck;
      }
      
      const hasNickname = await User.findOne({ attributes: ['nickname'], where: { nickname: nickname } });
      if (hasNickname) {
        return alreadyExistNickname;
      }
      
      const user = await User.create({
        nickname: nickname,
        token: token,
      });

      const payload = {
        user: {
          id: user.id,
        },
      };

      const jwtToken = jwt.sign(
        payload,
        config.jwtSecret,
      );

      Character.create({
        user_id: user.id,
      });

      Skin.create({
        user_id: user.id,
      })

      const responseDTO: SignUpResponseDTO = {
        status: 200,
        data: {
          jwt: jwtToken,
        }
      }
      
      return responseDTO;

    } catch (err) {
      console.error(err);
      return serverError;
    }
  }
}
