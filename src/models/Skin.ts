import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User"

interface SkinAttributes {
  id?: number;
  user_id: number;
};

export class Skin extends Model<SkinAttributes>{
  public readonly id!: number;
  public user_id!: number;

  public static associations: {
    user_id: Association<User, Skin>;
  };
}

Skin.init(
  {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
      modelName: 'Skin',
      tableName: 'Skin',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

Skin.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})