import { Request, Response } from "express";
import Services from "../models/Services";
import Scheduling from "../models/Scheduling";
import Schedule from "../models/Schedule";

const ServicesController = {
  createService: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, image, description, idBranch } = req.body;
      const services = await Services.create({ name, image, description, idBranch });
      res.status(201).json(services);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while creating the service." });
    }
  },

  getAllServices: async (req: Request, res: Response): Promise<void> => {
    try {
      const service = await Services.findAll();
      res.status(200).json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching service." });
    }
  },

  getServiceById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const service = await Services.findByPk(id);
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ message: "Service not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching the service." });
    }
  },

  updateService: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, image, description, idBranch } = req.body;
    try {
      const service = await Services.findByPk(id);
      if (service) {
        await service.update({ name, image, description, idBranch });
        res.status(200).json({ message: "Service updated successfully." });
      } else {
        res.status(404).json({ message: "Service not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the Service." });
    }
  },

  deleteService: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const service = await Services.findByPk(id);
      if (service) {
        await service.destroy();
        res.status(200).json({ message: "Service deleted successfully." });
      } else {
        res.status(404).json({ message: "Service not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while deleting the service." });
    }
  },
};

export default ServicesController;
