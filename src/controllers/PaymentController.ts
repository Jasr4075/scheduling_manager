import { Request, Response } from "express";
import Payment from "../models/Payment";

const PaymentController = {
  createPayment: async (req: Request, res: Response): Promise<void> => {
    try {
      const { totalValue, status, idPaymentMethod, idUser } = req.body;
      const payment = await Payment.create({ totalValue, status, idPaymentMethod, idUser });
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: "Error creating the payment" });
    }
  },

  getAllPayments: async (_req: Request, res: Response): Promise<void> => {
    try {
      const payments = await Payment.findAll();
      res.json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting payments" });
    }
  },

  getPaymentById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) {
        res.status(404).json({ message: "Payment not found" });
      } else {
        res.json(payment);
      }
    } catch (error) {
      res.status(500).json({ error: "Error getting the payment" });
    }
  },

  updatePayment: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) {
        res.status(404).json({ message: "Payment not found" });
      } else {
        const { totalValue, status, idPaymentMethod, idUser } = req.body;
        await payment.update({ totalValue, status, idPaymentMethod, idUser });
        res.json(payment);
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating the payment" });
    }
  },

  deletePayment: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) {
        res.status(404).json({ message: "Payment not found" });
      } else {
        await payment.destroy();
        res.json({ message: "Payment deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting the payment" });
    }
  },
};

export default PaymentController;
