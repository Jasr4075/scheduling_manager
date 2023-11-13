import { Request, Response, response } from "express";
import Scheduling from "../models/Scheduling";
import { Model, QueryTypes, Sequelize } from "sequelize";
import Schedule from "../models/Schedule";
import Services from "../models/Services";
import { sequelize } from "../config/config";

const SchedulingController = {
  createScheduling: async (req: Request, res: Response): Promise<void> => {
    try {
      const { dataScheduling, status, timeScheduling, idSchedule, idPayment, } = req.body;
      const newScheduling = await Scheduling.create({
        dataScheduling,
        status,
        timeScheduling,
        idSchedule,
        idPayment,
      });
      res.status(201).json(newScheduling);
    } catch (error) {
      console.error(error);
      console.error("Erro ao criar agendamento:", error);

      res.status(500).json({ message: "An error occurred while creating the scheduling." });
    }
  },

  getAllSchedulings: async (req: Request, res: Response): Promise<void> => {
    try {
      const schedulings = await Scheduling.findAll();
      res.status(200).json(schedulings);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching schedulings." });
    }
  },

  getSchedulingById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const scheduling = await Scheduling.findByPk(id);
      if (scheduling) {
        res.status(200).json(scheduling);
      } else {
        res.status(404).json({ message: "Scheduling not found." });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching the scheduling." });
    }
  },

  updateScheduling: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { dataScheduling, status, timeScheduling, idSchedule, idPayment, } = req.body;
    try {
      const scheduling = await Scheduling.findByPk(id);
      if (scheduling) {
        await scheduling.update({
          dataScheduling,
          status,
          timeScheduling,
          idSchedule,
          idPayment,
        });
        res.status(200).json({ message: "Scheduling updated successfully." });
      } else {
        res.status(404).json({ message: "Scheduling not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the scheduling." });
    }
  },

  deleteScheduling: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const scheduling = await Scheduling.findByPk(id);
      if (scheduling) {
        await scheduling.destroy();
        res.status(200).json({ message: "Scheduling deleted successfully." });
      } else {
        res.status(404).json({ message: "Scheduling not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while deleting the scheduling." });
    }
  },
  getDadosScheduling: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await Scheduling.sequelize?.query(
        `
        SELECT *,
        sl.created_at as createdAg
        FROM "scheduling" sl
        JOIN "schedule" sd ON sl.id_schedule = sd.id
        JOIN "schedules" ss ON sd.id = ss.id_schedule
        WHERE ss.start_time::time = sl.time_scheduling::time;
        `,
        {type: QueryTypes.SELECT}
      );
      res.json(response)
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      res.status(500).json({ error: "Erro ao buscar dados!"});
    }
  },
  getDetails: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await Scheduling.sequelize?.query(
        `
        select
        sling.id as "agendamento",
        sling.data_scheduling,
        sling.created_at,
        sling.id_payment,
        sling.id_schedule,
        sling.status,
        sling.time_scheduling,
        sles.id as "hora",
        sles.start_time,
        sles.end_time,
        sle.time_to_reschedule,
        sle.service_price,
        pay."id_payment_method",
        u.id as "id_user",
        u.name as "nomeUser",
        u.phone as "foneUser",
        s.name as "nameServices",
        payM.type
    from "scheduling" as sling
    join "schedule" as sle on sling.id_schedule = sle.id
    join "services" as s on sle.id_services = s.id
    join "payment" as pay on sling.id_payment = pay.id
    join "users" as u on pay.id_user = u.id
    join "paymentmethods" as payM on pay."id_payment_method" = payM.id
    join "schedules" as sles on sle.id = sles.id_schedule
    WHERE sling.time_scheduling::time = sles.start_time::time;
        `,
        {type: QueryTypes.SELECT}
      );
      res.json(response)
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      res.status(500).json({ error: "Erro ao buscar dados!"});
    }
  },
}

export default SchedulingController;