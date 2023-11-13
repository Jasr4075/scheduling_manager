import { Request, Response } from "express";
import Schedule from "../models/Schedule";
import { QueryTypes } from "sequelize";

const ScheduleController = {
  createSchedule: async (req: Request, res: Response): Promise<void> => {
    try {
      const { idUser, idBranch, idServices, servicePrice, timeToReschedule } = req.body;
      const newSchedule = await Schedule.create({
        servicePrice,
        timeToReschedule,
        idUser,
        idBranch,
        idServices,
      });
      res.status(201).json(newSchedule);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while creating the schedule." });
    }
  },

  getAllSchedule: async (req: Request, res: Response): Promise<void> => {
    try {
      const schedules = await Schedule.findAll();
      res.status(200).json(schedules);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching schedules." });
    }
  },

  getScheduleById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const schedule = await Schedule.findByPk(id);
      if (schedule) {
        res.status(200).json(schedule);
      } else {
        res.status(404).json({ message: "Schedule not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching the schedule." });
    }
  },

  updateSchedule: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { idUser, idBranch, idServices, servicePrice, timeToReschedule } = req.body;
    try {
      const schedule = await Schedule.findByPk(id);
      if (schedule) {
        await schedule.update({
          servicePrice,
          timeToReschedule,
          idUser,
          idBranch,
          idServices
        });
        res.status(200).json({ message: "Schedule updated successfully." });
      } else {
        res.status(404).json({ message: "Schedule not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the schedule." });
    }
  },

  deleteSchedule: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const schedule = await Schedule.findByPk(id);
      if (schedule) {
        await schedule.destroy();
        res.status(200).json({ message: "Schedule deleted successfully." });
      } else {
        res.status(404).json({ message: "Schedule not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while deleting the schedule." });
    }
  },

  getDadosServices: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await Schedule.sequelize?.query(
        `
        select
          s.image,
          s.name as "nomeServico",
          s.description,
          sc.service_price as "precoServico",
          u.name as "nomeFuncionario"
        from schedule as sc
        join users as u on sc.id_user = u.id
        join services as s on sc.id_services = s.id;
        `,
        {type: QueryTypes.SELECT}
      );
      res.json(response)
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      res.status(500).json({ error: "Erro ao buscar dados!"});
    }
  }
}


export default ScheduleController;
