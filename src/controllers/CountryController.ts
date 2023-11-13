import { Request, Response } from "express";
import Country from "../models/Country";

const CountryController = {
  createCountry: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      const country = await Country.create({ 
        name 
      });
      res.status(201).json(country);
    } catch (error) {
      res.status(500).json({ error: "Error creating the country" });
    }
  },

  getAllCountries: async (_req: Request, res: Response): Promise<void> => {
    try {
      const countries = await Country.findAll();
      
      res.status(200).json(countries);
    } catch (error) {
      res.status(500).json({ error: "Error getting countries" });
    }
  },

  getCountryById: async (req: Request, res: Response): Promise<void> => {
    const countryId = parseInt(req.params.id, 10);
    try {
      const country = await Country.findByPk(countryId);
      if (!country) {
        res.status(404).json({ message: "Country not found" });
      } else {
        res.status(200).json(country);
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting the country" });
    }
  },

  updateCountry: async (req: Request, res: Response): Promise<void> => {
    const countryId = parseInt(req.params.id, 10);
    try {
      const country = await Country.findByPk(countryId);
      if (!country) {
        res.status(404).json({ message: "Country not found" });
      } else {
        const { name } = req.body;
        await country.update({ 
          name 
        });
        res.status(200).json(country);
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating the country" });
    }
  },

  deleteCountry: async (req: Request, res: Response): Promise<void> => {
    const countryId = parseInt(req.params.id, 10);
    try {
      const country = await Country.findByPk(countryId);
      if (!country) {
        res.status(404).json({ message: "Country not found" });
      } else {
        await country.destroy();
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting the country" });
    }
  },
};

export default CountryController;
