import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User";

interface CharacterAttributes {
  user_id: number;
  character_type?: number;
  character_card?: number;
  is_new?: boolean;
};

export class Character extends Model<CharacterAttributes>{
  public readonly user_id!: number;
  public readonly character_type: number;
  public readonly character_card: number;
  public is_new: boolean;

  public static associations: {
    user_id: Association<User, Character>;
  };
}

Character.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    character_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: 1
    },
    character_card: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: 1
    },
    is_new: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
      modelName: 'Character',
      tableName: 'Character',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

Character.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})