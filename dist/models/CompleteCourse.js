"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteCourse = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const User_1 = require("./User");
;
class CompleteCourse extends sequelize_1.Model {
}
exports.CompleteCourse = CompleteCourse;
CompleteCourse.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    course_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    start_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    challenge_dates: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    modelName: 'CompleteCourse',
    tableName: 'CompleteCourse',
    sequelize: index_1.default,
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});
CompleteCourse.belongsTo(User_1.User, {
    foreignKey: "user_id",
    targetKey: "id",
    onDelete: "cascade"
});
//# sourceMappingURL=CompleteCourse.js.map