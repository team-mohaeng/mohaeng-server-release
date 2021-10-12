import { smtpTransport } from "../config";

let generateRandom = function (min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

export default {
  email: async (email: String) => {
    let number = generateRandom(1111, 9999);

    const mailOptions = {
      from: "mohaeng_official@naver.com",
      to: email,
      subject: `[모행] 인증번호를 확인하세요! code: ${number}`,
      text: `모행? 비밀번호 바꾸러 왔어?
새로운 비밀번호를 설정하려면
입력창에 아래의 인증번호를 입력해줘~
< ${number} >

궁금한 사항이 있으시면 모행 공식 메일 mohaeng@naver.com 로 문의 주시길 바랍니다.
감사합니다!
`
    };

    const result = await smtpTransport.sendMail(mailOptions, (err, res) => {
      if (err) {
        number = null;
        console.error(err);
      }
      smtpTransport.close();
    });

    return number;
  }
}