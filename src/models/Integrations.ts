import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import Branch from "./Branch";

interface IntegrationAttributes {
  id: number;
  type: string;
  tokenApi: string;
  idBranch: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IntegrationCreationAttributes extends Optional<IntegrationAttributes, "id"> {}

class integrations extends Model<IntegrationAttributes, IntegrationCreationAttributes> implements IntegrationAttributes {
  public id!: number;
  public type!: string;
  public tokenApi!: string;
  public idBranch!: number
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    integrations.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        tokenApi: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: 'token_api',
        },
        idBranch: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'id_branch'
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: 'created_at',
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: 'updated_at',
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

    integrations.belongsTo(Branch, {
      as: 'branch',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idBranch',
        field: 'id_branch',
        allowNull: false
      },
    });
  }
}

integrations.initModel(sequelize);

export default integrations;


