"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompleteChallenge_1 = require("../../models/CompleteChallenge");
console.log("======Create CompleteChallenge Table======");
const createCompleteChallengeTable = async () => {
    await CompleteChallenge_1.CompleteChallenge.sync({ force: false })
        .then(() => {
        console.log("Success Create CompleteChallenge Table");
    })
        .catch((err) => {
        console.log("Error in Create CompleteChallenge Table : ", err);
    });
};
createCompleteChallengeTable();
//./node_modules/.bin/ts-node ./src/migrations/createTable/CompleteChallenge.ts
//# sourceMappingURL=CompleteChallenge.js.map