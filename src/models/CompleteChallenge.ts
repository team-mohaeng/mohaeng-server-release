import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User"

interface CompleteChallengeAttributes {
  user_id: number;
  course_id: number;
  challenge_id: number;
};

export class CompleteChallenge extends Model<CompleteChallengeAttributes>{
  public readonly user_id!: number;
  public readonly course_id!: number;
  public readonly challenge_id!: number;

  public static associations: {
    user_id: Association<User, CompleteChallenge>;
  };
}

CompleteChallenge.init(
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
      modelName: 'CompleteChallenge',
      tableName: 'CompleteChallenge',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

CompleteChallenge.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})