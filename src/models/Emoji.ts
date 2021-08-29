import { DataTypes, Model, Association } from "sequelize";
import sequelize from "./index";
import { User } from "./User";
import { Feed } from "./Feed";

interface EmojiAttributes {
  user_id: number;
  emoji_id: number;
  feed_id: number;
};

export class Emoji extends Model<EmojiAttributes>{
  public readonly user_id!: number;
  public readonly emoji_id!: number;
  public readonly feed_id!: number;

  public static associations: {
    user_id: Association<User, Emoji>;
    feed_id: Association<Feed, Emoji>;
  };
}

Emoji.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    emoji_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    feed_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
      modelName: 'Emoji',
      tableName: 'Emoji',
      sequelize,
      timestamps: false,
      underscored: false,
      freezeTableName: true,
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  }
);

Emoji.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "cascade"
})

Emoji.belongsTo(Feed, {
  foreignKey: "feed_id",
  targetKey: "id",
  onDelete: "cascade"
})