import { sequelize } from "../config/config";
import { DataTypes, Model, Optional } from "sequelize";
import Addresses from "./Addresses";

interface CompanyAttributes {
  id: number;
  idAddresses: number;
  companyDocument: string;
  businessName: string;
  email: string;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes, "id"> {}

class company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
  public id!: number;
  public idAddresses!: number;
  public companyDocument!: string;
  public businessName!: string;
  public email !: string;
  public phone !: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    company.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        companyDocument: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
          field: 'company_document',
        },
        businessName: {
          type: DataTypes.STRING(100),
          allowNull: false,
          field: 'business_name',
          unique: true,
        },
        phone: {
          type: DataTypes.STRING(16),
          allowNull: false,
          field: 'phone',
          unique: true,
        },
        email: {
          type: DataTypes.STRING(80),
          allowNull: false,
          field: 'email',
          unique: true,
        },
        idAddresses: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'id_addresses',
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
      },
      );
      company.belongsTo(Addresses, {
        as: 'addresses',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        foreignKey: {
          name: 'idAddresses',
          field: 'id_addresses',
          allowNull: false,
        },
      });
    return company;
  }
}

company.initModel(sequelize);

export default company;
