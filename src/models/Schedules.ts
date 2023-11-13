import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import Schedule from "./Schedule";

interface SchedulesAttributes {
  id: number;
  startTime: string;
  endTime: string;
  weekDay: number;
  idSchedule: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface SchedulesCreationAttributes extends Optional<SchedulesAttributes, "id"> {}

class schedules extends Model<SchedulesAttributes, SchedulesCreationAttributes> implements SchedulesAttributes {
  public id!: number;
  public startTime!: string;
  public endTime!: string;
  public weekDay!: number;
  public idSchedule!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  static initModel(sequelize: any) {
    schedules.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        startTime: {
          type: DataTypes.TIME,
          allowNull: false,
          field: 'start_time'
        },
        endTime: {
          type: DataTypes.TIME,
          allowNull: false,
          field: 'end_time'
        },
        weekDay: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'week_day'
        },
        idSchedule: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'id_schedule'
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

    schedules.belongsTo(Schedule, {
      as: 'schedule',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idSchedule',
        field: 'id_schedule',
        allowNull: false
      },
    });
  }
}

schedules.initModel(sequelize);

export default schedules;


