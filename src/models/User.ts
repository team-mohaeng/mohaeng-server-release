const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      token: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique:true,
      },
      password: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      },
      gender: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      birth_year: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      affinity: {
        type: Sequelize.INTEGER.UNSIGNED,
        default: 20
      },
      level: {
        type: Sequelize.STRING(10),
        default: 1,
      },
      current_course_id: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      current_challenge_id: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      current_progress_percent: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      is_written: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      post_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        default: 0,
      },
      complete_course_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        default: 0,
      },
      complete_challenge_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        default: 0,
      },
      badge_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        default: 0,
      },
      character_type: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      character_card: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      character_skin: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      challenge_penalty: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      feed_penalty: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      is_feed_new: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      is_style_new: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
};