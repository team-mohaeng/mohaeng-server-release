"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = require("../../models/Block");
console.log("======Create Block Table======");
const createBlockTable = async () => {
    await Block_1.Block.sync({ force: false })
        .then(() => {
        console.log("Success Create Block Table");
    })
        .catch((err) => {
        console.log("Error in Create Block Table : ", err);
    });
};
createBlockTable();
//./node_modules/.bin/ts-node ./src/migrations/createTable/Block.ts
//# sourceMappingURL=Block.js.map