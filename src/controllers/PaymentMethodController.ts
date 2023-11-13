import { Request, Response } from "express";
import PaymentMethod from "../models/PaymentMethod";

const PaymentMethodController = {
  getAllPaymentMethods: async (_req: Request, res: Response): Promise<void> => {
    try {
      const paymentMethods = await PaymentMethod.findAll();
      res.json(paymentMethods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting payment methods" });
    }
  },

  getPaymentMethodById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const paymentMethod = await PaymentMethod.findByPk(id);
      if (!paymentMethod) {
        res.status(404).json({ message: "Payment method not found" });
      } else {
        res.json(paymentMethod);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting payment method" });
    }
  },

  createPaymentMethod: async (req: Request, res: Response): Promise<void> => {
    const { idBranch, idIntegration, type, description } = req.body;
    try {
      const paymentMethod = await PaymentMethod.create({ type, description, idBranch, idIntegration });
      res.status(201).json(paymentMethod);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating payment method" });
    }
  },

  updatePaymentMethod: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { type, description, idBranch, idIntegration } = req.body;
    try {
      const paymentMethod = await PaymentMethod.findByPk(id);
      if (!paymentMethod) {
        res.status(404).json({ message: "Payment method not found" });
      } else {
        paymentMethod.type = type;
        paymentMethod.description = description;
        paymentMethod.idBranch = idBranch;
        paymentMethod.idIntegration = idIntegration;
        await paymentMethod.save();
        res.json(paymentMethod);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating payment method" });
    }
  },

  deletePaymentMethod: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const paymentMethod = await PaymentMethod.findByPk(id);
      if (!paymentMethod) {
        res.status(404).json({ message: 'Payment method not found' });
      } else {
        await paymentMethod.destroy();
        res.json({ message: 'Payment method deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting payment method' });
    }
  },
};

export default PaymentMethodController;
