import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import Users from "./Users";
import Branch from "./Branch";

interface UserBranchAttributes {
  id: number;
  idBranch: number;
  idUser: number;
  created_at?: Date;
  updated_at?: Date;
}

interface UserBranchCreationAttributes extends Optional<UserBranchAttributes, "id"> {}

class userbranch extends Model<UserBranchAttributes, UserBranchCreationAttributes> implements UserBranchAttributes {
  public id!: number;
  public idBranch!: number;
  public idUser!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    userbranch.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        idBranch: {
          type: DataTypes.INTEGER,
          field: "id_branch",
          allowNull: false
        },
        idUser: {
          type: DataTypes.INTEGER,
          field: "id_user",
          allowNull: false
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: "created_at",
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: "updated_at",
        },
      },
      {
        sequelize,
        freezeTableName: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );

    Branch.belongsToMany(Users, {
      through: userbranch,
      as: 'users',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idBranch',
        field: 'id_branch',
        allowNull: false,
      },
    });
    Users.belongsToMany(Branch, {
      through: userbranch,
      as: 'branch',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idUser',
        field: 'id_user',
        allowNull: false,
    }})
  }
}

userbranch.initModel(sequelize);

export default userbranch;
