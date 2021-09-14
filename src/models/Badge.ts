import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User"

interface BadgeAttributes {
  id?: number;
  user_id: string;
};

export class Badge extends Model<BadgeAttributes>{
  public readonly id!: number;
  public user_id!: string;

  public static associations: {
    user_id: Association<User, Badge>;
  };
}

Badge.init(
  {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,

    },
  },
  {
      modelName: 'Badge',
      tableName: 'Badge',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

Badge.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})