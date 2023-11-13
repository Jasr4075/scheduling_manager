import { Request, Response } from "express";
import State from "../models/State";

const StateController = {
  createState: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, idCountry } = req.body;
      const newState = await State.create({ 
        name, 
        idCountry 
      });
      res.status(201).json(newState);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while creating the state." });
    }
  },

  getAllStates: async (req: Request, res: Response): Promise<void> => {
    try {
      const states = await State.findAll();
      res.status(200).json(states);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching states." });
    }
  },

  getStateById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const state = await State.findByPk(id);
      if (state) {
        res.status(200).json(state);
      } else {
        res.status(404).json({ message: "State not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching the state." });
    }
  },

  updateState: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, idCountry } = req.body;
    try {
      const state = await State.findByPk(id);
      if (state) {
        await state.update({ 
          name, 
          idCountry 
        });
        res.status(200).json({ message: "State updated successfully." });
      } else {
        res.status(404).json({ message: "State not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the state." });
    }
  },

  deleteState: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const state = await State.findByPk(id);
      if (state) {
        await state.destroy();
        res.status(200).json({ message: "State deleted successfully." });
      } else {
        res.status(404).json({ message: "State not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while deleting the state." });
    }
  },
};

export default StateController;
