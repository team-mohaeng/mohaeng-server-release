import * as admin from 'firebase-admin';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config"
import { User } from "../models/User";
import { SignUpRequestDTO } from "../dto/Auth/SignUp/request/SignUpRequestDTO";
import { SignUpResponseDTO } from "../dto/Auth/SignUp/response/SignUpResponseDTO";
import { serverError, notExistUid, alreadyExistEmail, alreadyExistNickname } from "../errors";

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
        token: uid, //나중에 token으로 바꿔줘야함
        email: email,
        password: encryptedPassword,
        nickname: nickname,
        gender: gender,
        birth_year: birth_year
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
  }
}
