"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emoji = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const User_1 = require("./User");
const Feed_1 = require("./Feed");
;
class Emoji extends sequelize_1.Model {
}
exports.Emoji = Emoji;
Emoji.init({
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    emoji_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    feed_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
}, {
    modelName: 'Emoji',
    tableName: 'Emoji',
    sequelize: index_1.default,
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
Emoji.belongsTo(User_1.User, {
    foreignKey: "user_id",
    targetKey: "id",
    onDelete: "cascade"
});
Emoji.belongsTo(Feed_1.Feed, {
    foreignKey: "feed_id",
    targetKey: "id",
    onDelete: "cascade"
});
//# sourceMappingURL=Emoji.js.map