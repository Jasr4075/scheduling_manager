import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import PaymentMethod from "./PaymentMethod";
import Users from "./Users";

interface PaymentAttributes {
  id: number;
  totalValue: number;
  status: string;
  idUser: number;
  idPaymentMethod: number; 
  created_at?: Date;
  updated_at?: Date;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> {}

class payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number;
  public totalValue!: number;
  public status!: string;
  public idPaymentMethod!: number;
  public idUser!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    payment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        totalValue: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          field: 'total_value'
        },
        status: {
          type: DataTypes.STRING(25),
          allowNull: false,
        },
        idUser: { 
          type: DataTypes.INTEGER, 
          allowNull: false,
          field: 'id_user', 
        },
        idPaymentMethod: { 
          type: DataTypes.INTEGER, 
          allowNull: false,
          field: 'id_payment_method', 
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

    payment.belongsTo(PaymentMethod, {
      as: 'payment_method',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idPaymentMethod',
        field: 'id_payment_method',
        allowNull: false
      },
    });
    payment.belongsTo(Users, {
      as: 'users',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idUser',
        field: 'id_user',
        allowNull: false,
      },
    });

    return payment;
  }
}

payment.initModel(sequelize);

export default payment;
