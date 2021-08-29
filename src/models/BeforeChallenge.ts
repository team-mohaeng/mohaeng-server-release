import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User"

interface BeforeChallengeAttributes {
  user_id: number;
  course_id: number;
  challenge_id: number;
};

export class BeforeChallenge extends Model<BeforeChallengeAttributes>{
  public readonly user_id!: number;
  public readonly course_id!: number;
  public readonly challenge_id!: number;

  public static associations: {
    user_id: Association<User, BeforeChallenge>;
  };
}

BeforeChallenge.init(
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
      modelName: 'BeforeChallenge',
      tableName: 'BeforeChallenge',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

BeforeChallenge.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})