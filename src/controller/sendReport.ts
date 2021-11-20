import { smtpTransport } from "../config";

export default {
  email: async (nickname: String, content: String) => {
    const mailOptions = {
      from: "mohaeng_official@naver.com",
      to: "mohaeng_official@naver.com",
      subject: `[모행] 신고된 안부를 확인해주세요.`,
      text: `신고 받은 안부가 있습니다. 커뮤니티를 확인해주세요!

작성자: ${nickname}
안부: ${content} 

즐거운 모행 생활을 위해 관리자분의 점검을 부탁드려요 ~
`
    };

    await smtpTransport.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
      }
      smtpTransport.close();
    });

  }
}