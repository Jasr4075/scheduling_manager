import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import Addresses from "./Addresses";

interface UserAttributes {
  id: number;
  name: string;
  photo?: string;
  taxIdentificationNumber: string;
  phone: string;
  passwordHash: string;
  email: string;
  role: string;
  token?: string;
  credits?: number;
  idAddresses?: number
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public photo?: string;
  public taxIdentificationNumber!: string;
  public phone!: string;
  public passwordHash!: string;
  public email!: string;
  public role!: string;
  public token?: string;
  public credits?: number;
  public idAddresses?: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    users.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        photo: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        taxIdentificationNumber: {
          type: DataTypes.STRING(18),
          allowNull: false,
          unique: true,
          field: 'tax_identification_number'
        },
        phone: {
          type: DataTypes.STRING(16),
          allowNull: true,
          unique: true,
        },
        passwordHash: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: "password_hash",
        },
        email: {
          type: DataTypes.STRING(80),
          allowNull: false,
          unique: true,
        },
        role: {
          type: DataTypes.STRING(10),
          allowNull: false,
          defaultValue: 'customer',
        },
        token: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        credits: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        idAddresses: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'id_addresses'
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

    users.belongsTo(Addresses, {
      as: 'adresses',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idAddresses',
        field: 'id_addresses',
        allowNull: true
      },
    });

    return users;
  }
}

users.initModel(sequelize);

export default users;
