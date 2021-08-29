import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User"

interface CompleteCourseAttributes {
  id?: number;
  user_id: number;
  course_id: number;
  start_date: Date;
  end_date: Date;
  challenge_dates: string;
};

export class CompleteCourse extends Model<CompleteCourseAttributes>{
  public readonly id!: number;
  public user_id!: number;
  public course_id!: number;
  public start_date!: Date;
  public end_date!: Date;
  public challenge_dates: string;

  public static associations: {
    user_id: Association<User, CompleteCourse>;
  };
}

CompleteCourse.init(
  {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    challenge_dates: {
      type: DataTypes.STRING,
    },
  },
  {
      modelName: 'CompleteCourse',
      tableName: 'CompleteCourse',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

CompleteCourse.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})