import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import Schedule from "./Schedule";
import Payment from "./Payment";

interface SchedulingAttributes {
  id: number;
  dataScheduling: string;
  timeScheduling: string;
  status: string;
  idSchedule: number;
  idPayment: number;
  created_at?: Date;
  updated_at?: Date;
}

interface SchedulingCreationAttributes extends Optional<SchedulingAttributes, "id"> {}

class scheduling extends Model<SchedulingAttributes, SchedulingCreationAttributes> implements SchedulingAttributes {
  public id!: number;
  public dataScheduling!: string;
  public timeScheduling!: string;
  public status!: string;
  public idSchedule!: number;
  public idPayment!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    scheduling.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dataScheduling: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: 'data_scheduling'
        },
        status: {
          type: DataTypes.STRING(25),
          allowNull: false,
        },
        timeScheduling: {
          type: DataTypes.TIME,
          allowNull: false,
          field: 'time_scheduling',
        },
        idSchedule: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'id_schedule'
        },
        idPayment: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'id_payment'
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

    scheduling.belongsTo(Schedule, {
      as: 'schedule',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idSchedule',
        field: 'id_schedule',
        allowNull: false
      },
    });
    scheduling.belongsTo(Payment, {
      as: 'payment',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idPayment',
        field: 'id_payment',
        allowNull: false
      },
    });
  }
}

scheduling.initModel(sequelize);

export default scheduling;
