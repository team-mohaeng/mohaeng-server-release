import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User"

interface FeedAttributes {
  id?: number;
  user_id: string;
  nickname: string;
  content?: string;
  mood: number;
  image?: string;
  isPrivate: boolean;
  create_time?: Date;
};

export class Feed extends Model<FeedAttributes>{
  public readonly id!: number;
  public user_id!: string;
  public nickname!: string;
  public content: string;
  public mood!: number;
  public image: string;
  public isPrivate!: boolean;
  public create_time: Date;

  public static associations: {
    user_id: Association<User, Feed>;
  };
}

Feed.init(
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mood: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
      modelName: 'Feed',
      tableName: 'Feed',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

Feed.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})