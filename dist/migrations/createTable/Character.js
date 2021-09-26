"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = require("../../models/Character");
console.log("======Create Character Table======");
const createCharacterTable = async () => {
    await Character_1.Character.sync({ force: false })
        .then(() => {
        console.log("Success Create Character Table");
    })
        .catch((err) => {
        console.log("Error in Create Character Table : ", err);
    });
};
createCharacterTable();
//./node_modules/.bin/ts-node ./src/migrations/createTable/Character.ts
//# sourceMappingURL=Character.js.map