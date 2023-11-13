import { Request, Response } from "express";
import Branch, { BranchAttributes } from "../models/Branch";

const BranchController = {
  createBranch: async (req: Request, res: Response): Promise<void> => {
    try {
      const { idCompany, idAddresses, companyDocument, email, tradingName, businessName, phone } = req.body;
      const branch = await Branch.create({ companyDocument, email, tradingName, businessName, phone, idCompany, idAddresses});
      res.status(201).json(branch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while creating the branch." });
    }
  },

  getAllBranches: async (req: Request, res: Response): Promise<void> => {
    try {
      const branches = await Branch.findAll();
      res.json(branches);
    } catch (error) {
      res.status(500).json({ error: "Error getting branches." });
    }
  },

  getBranchById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const branch = await Branch.findByPk(id);
      if (branch) {
        res.json(branch);
      } else {
        res.status(404).json({ error: "Branch not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting branch." });
    }
  },

  updateBranch: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const { idCompany, idAddresses, companyDocument, email, tradingName, businessName, phone } = req.body;
    try {
      const branch = await Branch.findByPk(id);
      if (branch) {
        await branch.update({ idCompany, idAddresses, companyDocument, email, tradingName, businessName, phone });
        res.status(200).json({ message: "Branch updated successfully." });
      } else {
        res.status(404).json({ message: "Branch not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the branch." });
    }
  },

  deleteBranch: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedRowCount = await Branch.destroy({
        where: { id },
      });
      if (deletedRowCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Branch not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting branch." });
    }
  },

  getBranchByCompany: async (req: Request, res: Response): Promise<void> => {
    
  },

};

export default BranchController;
