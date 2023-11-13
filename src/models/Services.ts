import { sequelize } from "../config/config";
import Branch from "./Branch";
import { DataTypes, Model, Optional } from "sequelize";

interface ServicesAttributes {
  id: number;
  name: string;
  image: string;
  idBranch: number;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

interface ServicesCreationAttributes extends Optional<ServicesAttributes, "id"> {}

class services extends Model<ServicesAttributes, ServicesCreationAttributes> implements ServicesAttributes {
  public id!: number;
  public name!: string;
  public image!: string;
  public description!: string;
  public idBranch!: number; 
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    services.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: false,
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
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );

      services.belongsTo(Branch, {
        as: 'branch',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: {
          name: 'idBranch',
          field: 'id_branch',
          allowNull: false
        },
      });
    return services;
  }
}

services.initModel(sequelize);

export default services;
