"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Badge_1 = require("../../models/Badge");
console.log("======Create Badge Table======");
const createBadgeTable = async () => {
    await Badge_1.Badge.sync({ force: false })
        .then(() => {
        console.log("Success Create Badge Table");
    })
        .catch((err) => {
        console.log("Error in Create Badge Table : ", err);
    });
};
createBadgeTable();
//./node_modules/.bin/ts-node ./src/migrations/createTable/Badge.ts
//# sourceMappingURL=Badge.js.map