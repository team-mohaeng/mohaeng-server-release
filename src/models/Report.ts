import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User"
import { Feed } from "./Feed"

interface ReportAttributes {
  user_id: number;
  post_id: number;
};

export class Report extends Model<ReportAttributes>{
  public user_id!: number;
  public post_id!: number;

  public static associations: {
    user_id: Association<User, Report>;
    post_id: Association<Feed, Report>;
  };
}

Report.init(
  {
    user_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
      modelName: 'Report',
      tableName: 'Report',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

Report.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})

Report.belongsTo(Feed, {
  foreignKey: "post_id",
  targetKey: "id",
  onDelete: "cascade"
})