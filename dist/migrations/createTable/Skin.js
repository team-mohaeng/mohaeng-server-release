"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Skin_1 = require("../../models/Skin");
console.log("======Create Skin Table======");
const createSkinTable = async () => {
    await Skin_1.Skin.sync({ force: false })
        .then(() => {
        console.log("Success Create Skin Table");
    })
        .catch((err) => {
        console.log("Error in Create Skin Table : ", err);
    });
};
createSkinTable();
//./node_modules/.bin/ts-node ./src/migrations/createTable/Skin.ts
//# sourceMappingURL=Skin.js.map