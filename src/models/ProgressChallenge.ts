import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User"

interface ProgressChallengeAttributes {
  user_id: number;
  course_id: number;
  challenge_id: number;
};

export class ProgressChallenge extends Model<ProgressChallengeAttributes>{
  public readonly user_id!: number;
  public readonly course_id!: number;
  public readonly challenge_id!: number;

  public static associations: {
    user_id: Association<User, ProgressChallenge>;
  };
}

ProgressChallenge.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    challenge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
      modelName: 'ProgressChallenge',
      tableName: 'ProgressChallenge',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

ProgressChallenge.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})