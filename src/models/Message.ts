import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User"

interface MessageAttributes {
  id?: number;
  user_id: number;
  ment: string;
  date?: Date;
  is_new?: boolean;
};

export class Message extends Model<MessageAttributes>{
  public readonly id: number;
  public user_id!: number;
  public ment!: string;
  public date: Date;
  public is_new: boolean;

  public static associations: {
    user_id: Association<User, Message>;
  };
}

Message.init(
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
    ment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    is_new: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
      modelName: 'Message',
      tableName: 'Message',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

Message.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})