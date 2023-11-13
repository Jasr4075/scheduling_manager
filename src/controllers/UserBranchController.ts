import { Request, Response } from "express";
import UserBranch from "../models/UserBranch";

const UserBranchController = {
  createUserBranch: async (req: Request, res: Response): Promise<void> => {
    try {
      const { idBranch, idUser } = req.body;
      const userbranch = await UserBranch.create({ idBranch, idUser });
      res.status(201).json(userbranch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while creating the User Branch." });
    }
  },

  getUserBranchById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const userBranch = await UserBranch.findByPk(id);
      if (userBranch) {
        res.status(200).json(userBranch);
      } else {
        res.status(404).json({ message: "User-branch relationship not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching the user-branch relationship." });
    }
  },

   updateUserBranch: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { idUser, idBranch} = req.body;
    try {
      const userBranch = await UserBranch.findByPk(id);
      if (userBranch) {
        await userBranch.update({ idUser, idBranch });
        res.status(200).json({ message: "User-branch relationship updated successfully." });
      } else {
        res.status(404).json({ message: "User-branch relationship not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the user-branch relationship." });
    }
  },

  getAllUsersBranch: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await UserBranch.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching the users." });
    }
  },

   deleteUserBranch: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const userBranch = await UserBranch.findByPk(id);
      if (userBranch) {
        await userBranch.destroy();
        res.status(200).json({ message: "User-branch relationship deleted successfully." });
      } else {
        res.status(404).json({ message: "User-branch relationship not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while deleting the user-branch relationship." });
    }
  }
}

export default UserBranchController;
