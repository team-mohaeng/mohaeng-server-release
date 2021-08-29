import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User"

interface MessageAttributes {
  id?: number;
  user_id: number;
  course_id: number;
  date: Date;
};

export class Message extends Model<MessageAttributes>{
  public readonly id!: number;
  public user_id!: number;
  public course_id!: number;
  public date!: Date;

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
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
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