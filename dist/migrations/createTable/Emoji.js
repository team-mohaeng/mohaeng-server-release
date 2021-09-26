"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Emoji_1 = require("../../models/Emoji");
console.log("======Create Emoji Table======");
const createEmojiTable = async () => {
    await Emoji_1.Emoji.sync({ force: false })
        .then(() => {
        console.log("Success Create Emoji Table");
    })
        .catch((err) => {
        console.log("Error in Create Emoji Table : ", err);
    });
};
createEmojiTable();
//./node_modules/.bin/ts-node ./src/migrations/createTable/Emoji.ts
//# sourceMappingURL=Emoji.js.map