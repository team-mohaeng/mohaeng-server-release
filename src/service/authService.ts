import * as admin from 'firebase-admin';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "../models/User";
import { SignUpRequestDTO } from "../dto/Auth/SignUp/request/SignUpRequestDTO";
import { SignUpResponseDTO } from "../dto/Auth/SignUp/response/SignUpResponseDTO";
import { serverError, notExistToken, alreadyExistEmail, alreadyExistNickname, notMatchSignIn } from "../errors";
import { SignInRequestDTO } from '../dto/Auth/SignIn/request/SignInRequestDTO';
import { SignInResponseDTO } from '../dto/Auth/SignIn/response/SignInResponseDTO';

export default {
  signUp: async (dto: SignUpRequestDTO) => {
    try{
      const { email, password, nickname, gender, birth_year } = dto;

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
      let token;
      await (admin
      .auth()
      .createUser({
        email: email,
        disabled: false,
      })
      .then((userRecord) => {
        token = userRecord.uid;
      })
      .catch((error) => {
        console.log(error);
      })
      )
      
      if (token == null) {
        return notExistToken;
      }
      /*
      //User 생성
      await User.create({
        token: token,
        email: email,
        password: encryptedPassword,
        nickname: nickname,
        gender: gender,
        birth_year: birth_year
      });
      */
      const responseDTO: SignUpResponseDTO = {
        status: 200,
        token: token
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
      const user = await User.findOne({ attributes: ['password'], where: { email: email} });
      if (!user) {
        return notMatchSignIn;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return notMatchSignIn;
      }

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
  }
}
