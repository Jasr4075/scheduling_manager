import { Request, Response } from "express";
import Integrations from "../models/Integrations";

const IntegrationsController = {
  createIntegration: async (req: Request, res: Response): Promise<void> => {
    try {
      const { idBranch ,type, tokenApi } = req.body;
      const integration = await Integrations.create({ type, tokenApi, idBranch });
      res.status(201).json(integration);
    } catch (error) {
      res.status(500).json({ error: "Error creating the integration" });
    }
  },

  getAllIntegrations: async (_req: Request, res: Response): Promise<void> => {
    try {
      const integrations = await Integrations.findAll();
      res.status(200).json(integrations);
    } catch (error) {
      res.status(500).json({ error: "Error getting integrations" });
    }
  },

  getIntegrationById: async (req: Request, res: Response): Promise<void> => {
    const integrationId = parseInt(req.params.id, 10);
    try {
      const integration = await Integrations.findByPk(integrationId);
      if (!integration) {
        res.status(404).json({ message: "Integration not found" });
      } else {
        res.status(200).json(integration);
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting the integration" });
    }
  },

  updateIntegration: async (req: Request, res: Response): Promise<void> => {
    const integrationId = parseInt(req.params.id, 10);
    try {
      const integration = await Integrations.findByPk(integrationId);
      if (!integration) {
        res.status(404).json({ message: "Integration not found" });
      } else {
        const { idBranch, type, tokenApi } = req.body;
        await integration.update({ idBranch, type, tokenApi });
        res.status(200).json(integration);
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating the integration" });
    }
  },

  deleteIntegration: async (req: Request, res: Response): Promise<void> => {
    const integrationId = parseInt(req.params.id, 10);
    try {
      const integration = await Integrations.findByPk(integrationId);
      if (!integration) {
        res.status(404).json({ message: "Integration not found" });
      } else {
        await integration.destroy();
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting the integration" });
    }
  },
};

export default IntegrationsController;
