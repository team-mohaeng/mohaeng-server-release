"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProgressChallenge_1 = require("../../models/ProgressChallenge");
console.log("======Create ProgressChallenge Table======");
const createProgressChallengeTable = async () => {
    await ProgressChallenge_1.ProgressChallenge.sync({ force: false })
        .then(() => {
        console.log("Success Create ProgressChallenge Table");
    })
        .catch((err) => {
        console.log("Error in Create ProgressChallenge Table : ", err);
    });
};
createProgressChallengeTable();
//./node_modules/.bin/ts-node ./src/migrations/createTable/ProgressChallenge.ts
//# sourceMappingURL=ProgressChallenge.js.map