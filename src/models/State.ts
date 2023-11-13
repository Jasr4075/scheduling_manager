import { sequelize } from "../config/config";
import Country from "./Country";
import { DataTypes, Model, Optional } from "sequelize";

interface StateAttributes {
  id: number;
  name: string;
  idCountry: number;
  created_at?: Date;
  updated_at?: Date;
}

interface StateCreationAttributes extends Optional<StateAttributes, "id"> {}

class state extends Model<StateAttributes, StateCreationAttributes> implements StateAttributes {
  public id!: number;
  public name!: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
  public idCountry!: number; 

  static initModel(sequelize: any) {
    state.init(
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
        idCountry: {
          type: DataTypes.INTEGER,
          field: 'id_country',
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

    state.belongsTo(Country, {
      as: 'country',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idCountry',
        field: 'id_country',
        allowNull: false,
      },
    });

    return state;
  }
}

state.initModel(sequelize);

export default state;
