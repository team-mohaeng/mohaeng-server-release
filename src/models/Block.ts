import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User"

interface BlockAttributes {
  user_id: number;
  reported_id: number;
};

export class Block extends Model<BlockAttributes>{
  public user_id!: number;
  public reported_id!: number;

  public static associations: {
    user_id: Association<User, Block>;
    reported_id: Association<User, Block>;
  };
}

Block.init(
  {
    user_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
    },
    reported_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
      modelName: 'Block',
      tableName: 'Block',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

Block.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})

Block.belongsTo(User, {
  foreignKey: "reported_id",
  targetKey: "id",
  onDelete: "cascade"
})