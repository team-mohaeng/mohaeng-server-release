"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
exports.default = {
    email: async (nickname, content) => {
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
        await config_1.smtpTransport.sendMail(mailOptions, (err, res) => {
            if (err) {
                console.log(err);
            }
            config_1.smtpTransport.close();
        });
    }
};
//# sourceMappingURL=sendReport.js.map