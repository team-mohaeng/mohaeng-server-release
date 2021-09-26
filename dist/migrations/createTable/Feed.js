"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Feed_1 = require("../../models/Feed");
console.log("======Create Feed Table======");
const createFeedTable = async () => {
    await Feed_1.Feed.sync({ force: false })
        .then(() => {
        console.log("Success Create Feed Table");
    })
        .catch((err) => {
        console.log("Error in Create Feed Table : ", err);
    });
};
createFeedTable();
//./node_modules/.bin/ts-node ./src/migrations/createTable/Feed.ts
//# sourceMappingURL=Feed.js.map