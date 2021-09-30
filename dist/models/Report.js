"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const User_1 = require("./User");
const Feed_1 = require("./Feed");
;
class Report extends sequelize_1.Model {
}
exports.Report = Report;
Report.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
}, {
    modelName: 'Report',
    tableName: 'Report',
    sequelize: index_1.default,
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
Report.belongsTo(User_1.User, {
    foreignKey: "user_id",
    targetKey: "id",
    onDelete: "cascade"
});
Report.belongsTo(Feed_1.Feed, {
    foreignKey: "post_id",
    targetKey: "id",
    onDelete: "cascade"
});
//# sourceMappingURL=Report.js.map