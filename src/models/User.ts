import { DataTypes, Model, } from 'sequelize';
import sequelize from './index';

interface UserAttributes {
  id?: number; //not null, auto increment
  uid: string;
  token?: string;
  email : string;
  password: string;
  nickname: string;
  affinity?: number;
  level?: number;
  current_course_id?: number;
  current_challenge_id?: number;
  current_progress_percent?: number;
  is_completed?: boolean;
  is_written?: boolean;
  feed_count?: number;
  complete_course_count?: number;
  complete_challenge_count?: number;
  badge_count?: number;
  character_type?: number;
  character_card?: number;
  character_skin?: number;
  challenge_penalty?: boolean;
  feed_penalty?: boolean;
  is_feed_new?: boolean;
  is_style_new?: boolean;
  is_badge_new?: boolean;
  recent_challenge_date?: Date;
  challenge_success_count?: number;
  feed_success_count?: number;
};

export class User extends Model<UserAttributes>{
  public readonly id!: number;
  public uid!: string;
  public token: string;
  public email!: string;
  public password!: string;
  public nickname!: string;
  public affinity: number;
  public level: number;
  public current_course_id: number | null;
  public current_challenge_id: number | null;
  public current_progress_percent: number | null;
  public is_completed: boolean;
  public is_written: boolean;
  public feed_count: number;
  public complete_course_count: number;
  public complete_challenge_count: number;
  public badge_count: number;
  public character_type: number;
  public character_card: number;
  public character_skin: number;
  public challenge_penalty: boolean;
  public feed_penalty: boolean;
  public is_feed_new: boolean;
  public is_style_new: boolean;
  public is_badge_new: boolean;
  public recent_challenge_date: Date;
  public challenge_success_count: number;
  public feed_success_count: number;

  public static associations: {
  };
}

User.init(
  {
    uid: {
      type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    token: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique:true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    affinity: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.STRING(10),
      defaultValue: 1,
    },
    current_course_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    current_challenge_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    current_progress_percent: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_written: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    feed_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    complete_course_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    complete_challenge_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    badge_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    character_type: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    character_card: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    character_skin: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    challenge_penalty: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    feed_penalty: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_feed_new: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_style_new: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_badge_new: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    recent_challenge_date: {
      type: DataTypes.DATE,
    },
    challenge_success_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    feed_success_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
  },
  {
      modelName: 'User',
      tableName: 'User',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);