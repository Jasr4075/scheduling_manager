import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import Addresses from "./Addresses";
import Company from "./Company";

export interface BranchAttributes {
  id: number;
  companyDocument: string;
  email: string;
  tradingName: string;
  businessName: string;
  phone: string;
  idCompany: number;
  idAddresses:number;
  created_at?: Date;
  updated_at?: Date;
}

interface BranchCreationAttributes extends Optional<BranchAttributes, "id"> {}

class branch extends Model<BranchAttributes, BranchCreationAttributes> implements BranchAttributes {
  public id!: number;
  public companyDocument!: string;
  public email!: string;
  public tradingName!: string;
  public businessName!: string;
  public phone!: string;
  public idCompany!: number;
  public idAddresses!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;


  static initModel(sequelize: any) {
    branch.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        companyDocument: {
          type: DataTypes.STRING(20),
          allowNull: false,
          field: 'company_document',
          unique: true
        },
        email: {
          type: DataTypes.STRING(80),
          allowNull: false,
          unique: true
        },
        tradingName: {
          type: DataTypes.STRING(100),
          allowNull: false,
          field: 'trading_name'
        },
        businessName: {
          type: DataTypes.STRING(100),
          field: 'business_name',
          allowNull: false,
          unique: true
        },
        phone: {
          type: DataTypes.STRING(16),
          allowNull: false,
          unique: true
        },
        idCompany: {
          type: DataTypes.INTEGER,
          field: 'id_company',
          allowNull: false
        },
        idAddresses: {
          type: DataTypes.INTEGER,
          field: 'id_addresses',
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

    branch.belongsTo(Company, {
      as: 'company',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idCompany',
        field: 'id_company',
      },
    });
    branch.belongsTo(Addresses, {
      as: 'addresses',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idAddresses',
        field: 'id_addresses',
        allowNull: false,
      },
    });
  }
}

branch.initModel(sequelize);

export default branch;

