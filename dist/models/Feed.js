"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feed = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const User_1 = require("./User");
;
class Feed extends sequelize_1.Model {
}
exports.Feed = Feed;
Feed.init({
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nickname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    current_course_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    current_challenge_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mood: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
    isPrivate: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    create_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    modelName: 'Feed',
    tableName: 'Feed',
    sequelize: index_1.default,
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
Feed.belongsTo(User_1.User, {
    foreignKey: "user_id",
    targetKey: "id",
    onDelete: "cascade"
});
//# sourceMappingURL=Feed.js.map