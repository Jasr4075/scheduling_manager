import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import City from "./City";
export interface AddressAttributes {
  id: number;
  zipCode: string;
  district: string;
  street: string;
  number: number;
  complement?: string;
  idCity: number;
  created_at?: Date;
  updated_at?: Date;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, "id"> {}

class addresses extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
  public id!: number;
  public zipCode!: string;
  public district!: string;
  public street!: string;
  public number!: number;
  public complement?: string;
  public idCity!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    addresses.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        zipCode: {
          type: DataTypes.STRING(10),
          allowNull: false,
          field: "zip_code",
        },
        district: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        street: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        complement: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        idCity: {
          type: DataTypes.INTEGER,
          field: 'id_city',
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

    addresses.belongsTo(City, {
      as: 'city',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idCity',
        field: 'id_city',
        allowNull: false,      
      },
    });

    return addresses;
  }
}

addresses.initModel(sequelize);

export default addresses;
