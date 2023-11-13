import { sequelize } from "../config/config";
import { DataTypes, Model, Optional } from "sequelize";

interface CountryAttributes {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

interface CountryCreationAttributes extends Optional<CountryAttributes, "id"> {}

class country extends Model<CountryAttributes, CountryCreationAttributes> implements CountryAttributes {
  public id!: number;
  public name!: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    country.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(41),
          allowNull: false,
          unique: true,
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
    return country;
  }
}

country.initModel(sequelize);

export default country;
