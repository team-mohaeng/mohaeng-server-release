"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const User_1 = require("./User");
;
class Block extends sequelize_1.Model {
}
exports.Block = Block;
Block.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    reported_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
}, {
    modelName: 'Block',
    tableName: 'Block',
    sequelize: index_1.default,
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
Block.belongsTo(User_1.User, {
    foreignKey: "user_id",
    targetKey: "id",
    onDelete: "cascade"
});
Block.belongsTo(User_1.User, {
    foreignKey: "reported_id",
    targetKey: "id",
    onDelete: "cascade"
});
//# sourceMappingURL=Block.js.map