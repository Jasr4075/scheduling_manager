import { Request, Response } from "express";
import Company from "../models/Company";

const CompanyController = {
  createCompany: async (req: Request, res: Response): Promise<void> => {
    try {
      const { companyDocument, businessName, email, phone, idAddresses } = req.body;
      const company = await Company.create({ companyDocument, businessName, email, phone, idAddresses });
      res.status(201).json(company);
    } catch (error) {
      res.status(500).json({ error: "Error creating the company" });
    }
  },

  getAllCompanies: async (_req: Request, res: Response): Promise<void> => {
    try {
      const companies = await Company.findAll();
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ error: "Error getting companies" });
    }
  },

  getCompanyById: async (req: Request, res: Response): Promise<void> => {
    const companyId = parseInt(req.params.id, 10);
    try {
      const company = await Company.findByPk(companyId);
      if (!company) {
        res.status(404).json({ message: "Company not found" });
      } else {
        res.status(200).json(company);
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting the company" });
    }
  },

  updateCompany: async (req: Request, res: Response): Promise<void> => {
    const companyId = parseInt(req.params.id, 10);
    try {
      const company = await Company.findByPk(companyId);
      if (!company) {
        res.status(404).json({ message: "Company not found" });
      } else {
        const { companyDocument, businessName, email, phone, idAddresses } = req.body;
        await company.update({ companyDocument, businessName, email, phone, idAddresses });
        res.status(200).json(company);
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating the company" });
    }
  },

  deleteCompany: async (req: Request, res: Response): Promise<void> => {
    const companyId = parseInt(req.params.id, 10);
    try {
      const company = await Company.findByPk(companyId);
      if (!company) {
        res.status(404).json({ message: "Company not found" });
      } else {
        await company.destroy();
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting the company" });
    }
  },
};

export default CompanyController;
