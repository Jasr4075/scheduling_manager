import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import Branch from "./Branch";
import Integration from "./Integrations";

interface PaymentMethodAttributes {
  id: number;
  description: string;
  idBranch: number;
  idIntegration: number;
  type: string;
  created_at?: Date;
  updated_at?: Date;
}

interface PaymentMethodCreationAttributes extends Optional<PaymentMethodAttributes, "id"> {}

class paymentmethods extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes> implements PaymentMethodAttributes {
  public id!: number;
  public idBranch!: number;
  public idIntegration!: number;
  public type!: string;
  public description!: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    paymentmethods.init(
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
        description: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        idBranch: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'id_branch'
        },
        idIntegration: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'id_integration'
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

    paymentmethods.belongsTo(Branch, {
      as: 'branch',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idBranch',
        field: 'id_branch',
        allowNull: false
      },
    });

    paymentmethods.belongsTo(Integration, {
      as: 'integrations',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idIntegration',
        field: 'id_integration',
        allowNull: false
      },
    });
  }
}

paymentmethods.initModel(sequelize);

export default paymentmethods;



