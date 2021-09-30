"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Report_1 = require("../../models/Report");
console.log("======Create Report Table======");
const createReportTable = async () => {
    await Report_1.Report.sync({ force: false })
        .then(() => {
        console.log("Success Create Report Table");
    })
        .catch((err) => {
        console.log("Error in Create Report Table : ", err);
    });
};
createReportTable();
//./node_modules/.bin/ts-node ./src/migrations/createTable/Report.ts
//# sourceMappingURL=Report.js.map