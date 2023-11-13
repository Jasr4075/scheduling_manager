import { Request, Response } from "express";
import City from "../models/City";

const CityController = {
  createCity: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, idState } = req.body;
      const city = await City.create({ 
        name, 
        idState 
      });
      res.status(201).json(city);
    } catch (error) {
      res.status(500).json({ error: "Error creating the city" });
    }
  },

  getAllCities: async (req: Request, res: Response): Promise<void> => {
    try {
      const cities = await City.findAll();
      res.status(200).json(cities);
    } catch (error) {
      res.status(500).json({ error: "Error getting cities" });
    }
  },

  getCityById: async (req: Request, res: Response): Promise<void> => {
    const cityId = parseInt(req.params.id, 10);
    try {
      const city = await City.findByPk(cityId);
      if (!city) {
        res.status(404).json({ message: "City not found" });
      } else {
        res.status(200).json(city);
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting the city" });
    }
  },

  updateCity: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, idState } = req.body; 
    try {
      const state = await City.findByPk(id);
      if (state) {
        await state.update({ 
          name, 
          idState 
        });
        res.status(200).json({ message: "City updated successfully." });
      } else {
        res.status(404).json({ message: "City not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the city." });
    }
  },

  deleteCity: async (req: Request, res: Response): Promise<void> => {
    const cityId = parseInt(req.params.id, 10);
    try {
      const city = await City.findByPk(cityId);
      if (!city) {
        res.status(404).json({ message: "City not found" });
      } else {
        await city.destroy();
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting the city" });
    }
  },
};

export default CityController;
