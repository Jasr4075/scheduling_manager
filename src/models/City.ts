import { sequelize } from "../config/config";
import { DataTypes, Model, Optional } from "sequelize";
import State from "./State";

export interface CityAttributes {
  id: number;
  name: string;
  idState: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CityCreationAttributes extends Optional<CityAttributes, "id"> {}

class city extends Model<CityAttributes, CityCreationAttributes> implements CityAttributes {
  public id!: number;
  public name!: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
  public idState!: number;

  static initModel(sequelize: any) {
    city.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(58),
          allowNull: false,
        },
        idState: {
          type: DataTypes.INTEGER,
          field: 'id_state',
          allowNull: false,
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

    city.belongsTo(State, {
      as: 'state',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idState',
        field: 'id_state',
        allowNull: false,
      },
    });

    return city;
  }
}

city.initModel(sequelize);

export default city;
