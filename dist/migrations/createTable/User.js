"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
console.log("======Create User Table======");
const createUserTable = async () => {
    await User_1.User.sync({ force: false })
        .then(() => {
        console.log("Success Create User Table");
    })
        .catch((err) => {
        console.log("Error in Create User Table : ", err);
    });
};
createUserTable();
//./node_modules/.bin/ts-node ./src/migrations/createTable/User.ts
//# sourceMappingURL=User.js.map