import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/config";
import Branch from "./Branch";
import Users from "./Users";
import Services from "./Services";

interface ScheduleAttributes {
  id: number;
  servicePrice: number;
  timeToReschedule: number;
  idUser: number;
  idBranch: number;
  idServices: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ScheduleCreationAttributes extends Optional<ScheduleAttributes, "id"> {}

class schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes> implements ScheduleAttributes {
  public id!: number;
  public servicePrice!: number;
  public timeToReschedule!: number;
  public idUser!: number;
  public idBranch!: number;
  public idServices!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;


  static initModel(sequelize: any) {
    schedule.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        servicePrice: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          field: 'service_price'
        },
        timeToReschedule: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'time_to_reschedule'
        },
        idBranch: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'id_branch'
        },
        idUser: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'id_user'
        },
        idServices: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'id_services'
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

    schedule.belongsTo(Users, {
      as: 'users',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idUser',
        field: 'id_user',
        allowNull: false
      },
    });
    

    schedule.belongsTo(Branch, {
      as: 'branch',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idBranch',
        field: 'id_branch',
        allowNull: false
      } 
    });

    schedule.belongsTo(Services, {
      as: 'services',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      foreignKey: {
        name: 'idServices',
        field: 'id_services',
        allowNull: false
      } 
    });
  }
}

schedule.initModel(sequelize);

export default schedule;
