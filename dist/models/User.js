"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
;
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    uid: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    token: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(30),
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    nickname: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    affinity: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
    },
    level: {
        type: sequelize_1.DataTypes.STRING(10),
        defaultValue: 1,
    },
    current_course_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    current_challenge_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    current_progress_percent: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    is_completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    feed_count: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
    },
    complete_course_count: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
    },
    complete_challenge_count: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
    },
    badge_count: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
    },
    character_type: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    character_card: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    character_skin: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    challenge_penalty: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    feed_penalty: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_feed_new: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_style_new: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_badge_new: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    recent_challenge_date: {
        type: sequelize_1.DataTypes.DATE,
    },
    challenge_success_count: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
    },
    feed_success_count: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 1,
    },
}, {
    modelName: 'User',
    tableName: 'User',
    sequelize: index_1.default,
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
//# sourceMappingURL=User.js.map