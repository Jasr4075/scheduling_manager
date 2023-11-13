import { Request, Response } from "express";
import Addresses, { AddressAttributes } from "../models/Addresses";

const AddressesController = {
  createAddress: async (req: Request, res: Response): Promise<void> => {
    try {
      const { zipCode, district, street, number, complement, idCity,} = req.body;
      const address = await Addresses.create({ 
        zipCode,
        district,
        street,
        number,
        complement,
        idCity,
      });
      res.status(201).json(address);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while creating the address." });
    }
  },
  getAllAddresses: async (req: Request, res: Response): Promise<void> => {
    try {
      const addresses = await Addresses.findAll();
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: "Failed to get addresses." });
    }
  },

  getAddressById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const address = await Addresses.findByPk(id);
      if (address) {
        res.json(address);
      } else {
        res.status(404).json({ error: "Address not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get address." });
    }
  },

  updateAddress: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { zipCode, district, street, number, complement, idCity, } = req.body;
    try {
      const address = await Addresses.findByPk(id);
      if (address) {
        await address.update({ 
          zipCode,
          district,
          street,
          number,
          complement,
          idCity,
        });
        res.status(200).json({ message: "Address updated successfully." });
      } else {
        res.status(404).json({ message: "Address not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the address." });
    }
  },

  deleteAddress: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedRowCount = await Addresses.destroy({
        where: { id },
      });
      if (deletedRowCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Address not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to remove address." });
    }
  },
};

export default AddressesController;