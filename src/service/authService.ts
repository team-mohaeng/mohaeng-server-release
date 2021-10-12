import * as admin from 'firebase-admin';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config"
import password from '../controller/password';
import { User } from "../models/User";
import { SignUpRequestDTO } from "../dto/Auth/SignUp/request/SignUpRequestDTO";
import { SignUpResponseDTO } from "../dto/Auth/SignUp/response/SignUpResponseDTO";
import { SignInRequestDTO } from '../dto/Auth/SignIn/request/SignInRequestDTO';
import { SignInResponseDTO } from '../dto/Auth/SignIn/response/SignInResponseDTO';
import { serverError, notExistUid, alreadyExistEmail, alreadyExistNickname, notMatchSignIn, notExistUser, invalidEmail } from "../errors";
import { ChangePasswordRequestDTO } from '../dto/Auth/Password/request/ChangePasswordRequestDTO';
import { ChangePasswordResponseDTO } from '../dto/Auth/Password/response/ChangePasswordResponseDTO';
import { CheckEmailRequestDTO } from '../dto/Auth/Password/request/CheckEmailRequestDTO';
import { CheckEmailResponseDTO } from '../dto/Auth/Password/response/CheckEmailResponseDTO';

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

  forgetPassword: async (dto: CheckEmailRequestDTO) => {
    try{
      const { email } = dto;
      const user = await User.findOne({ where: { email: email }})
      if (!user) {
        return notExistUser;
      }

      const number = await password.email(email);
      if (!number) {
        return invalidEmail;
      }

      const responseDTO: CheckEmailResponseDTO = {
        status: 200,
        data: {
          number: number,
        }
      };

      return responseDTO;

    } catch (err) {
      console.error(err);
      return serverError;
    }
  },
  change: async (dto: ChangePasswordRequestDTO) => {
    try {
      const { email, password } = dto;

      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return notExistUser;
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      User.update({
        password: user.password
      },{
        where: { email: email }
      });

      const responseDTO: ChangePasswordResponseDTO = {
        status: 200,
        message: "비밀번호 바꾸기를 성공하였습니다."
      }
      return responseDTO;
    } catch (err) {
      console.log(err);
      return serverError;
    }
  }
}
