import { Request, Response } from "express";
import { Op } from "sequelize";
import Users from "../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getUserByToken from "../utils/getUserByToken";
import { error } from "console";
import { Model, QueryTypes, Sequelize } from "sequelize";

const UserController = {
  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        idAddresses,
        name,
        photo,
        taxIdentificationNumber,
        phone,
        passwordHash,
        email,
        role,
        token,
        credits,
      } = req.body;
      const newUser = await Users.create({
        name,
        photo,
        taxIdentificationNumber,
        phone,
        passwordHash,
        email,
        role,
        token,
        credits,
        idAddresses,
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the user." });
    }
  },

  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await Users.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the users." });
    }
  },
  getNonSuperadminUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await Users.findAll({
        where: {
          role: {
            [Op.ne]: "superadmin",
          },
        },
      });

      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao buscar os usuários." });
    }
  },

  getUserById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const user = await Users.findByPk(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the user." });
    }
  },

  updateUser: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const user = await Users.findByPk(id);
      if (user) {
        await user.update({
          name: req.body.name,
          photo: req.body.photo,
          taxIdentificationNumber: req.body.taxIdentificationNumber,
          phone: req.body.phone,
          email: req.body.email,
          role: req.body.role,
          passwordHash: req.body.passwordHash,
          token: req.body.token,
          idAddresses: req.body.idAddresses,
          credits: req.body.credits
        });
        res.status(200).json({ message: "User updated successfully." });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the user." });
    }
  },
  
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        idAddresses,
        name,
        photo,
        taxIdentificationNumber,
        password,
        phone,
        role,
        email,
      } = req.body;
      const userExists = await Users.findOne({
        where: {
          email,
        },
      });
      if (userExists) {
        res.status(400).json({
          type: "error",
          message: "E-mail already in use",
        });
        return;
      }
      const passwordHash: string = await bcrypt.hash(password, 10);
      const newUser = await Users.create({
        name,
        photo,
        taxIdentificationNumber,
        phone,
        passwordHash,
        email,
        role,
        idAddresses,
      });
      res.status(201).json({
        type: "success",
        message: "User Created",
        data: newUser,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        type: "error",
        message: "An error occurred while creating the user.",
        data: error.message,
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(200).send({
          type: "error",
          message: "E-mail not found!",
          data: [],
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (!passwordMatch) {
        return res.status(200).send({
          type: "error",
          message: "Incorrect e-mail or password",
          data: [],
        });
      }

      let token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.TOKEN_KEY || "IXCAGENDA",
        { expiresIn: "5h" }
      );
      user.token = token;
      await user.save();
      return res.status(200).send({
        type: "success",
        message: "Welcome! Login Successful!",
        data: user,
        token,
      });
    } catch (error) {
      return res.status(500).send({
        type: "error",
        message: "Erro",
        data: error,
      });
    }
  },

  getByToken: async (req: Request, res: Response) => {
    try {
      const user = await getUserByToken.getUserByToken(
        req.headers.authorization
      );

      if (user) {
        return res.status(200).send({
          type: "success",
          message: "User found",
          data: user,
        });
      }
    } catch (error: any) {
      return res.status(200).send({
        type: "error",
        message: "Error",
        data: error.message,
      });
    }
  },

  deleteUser: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const user = await Users.findByPk(id);
      if (user) {
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully." });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the user." });
    }
  },

  changeToAdmin: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const user = await Users.findByPk(id);
      if (user) {
        await user.update({
          role: "admin",
        });
        res.status(200).json({ message: "User updated successfully." });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the user." });
    }
  },

  changeToCustomer: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      changeRole: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { role } = req.body;
        try {
          const user = await Users.findByPk(id);
          if (user) {
            await user.update({ role });
            res
              .status(200)
              .json({ message: "User role updated successfully." });
          } else {
            res.status(404).json({ message: "User not found." });
          }
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({
              message: "An error occurred while updating the user role.",
            });
        }
      };
      const user = await Users.findByPk(id);
      if (user) {
        await user.update({
          role: "customer",
        });
        res.status(200).json({ message: "User updated successfully." });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the user." });
    }
  },
  getNewUsersMonth: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await Users.sequelize?.query(
        `
        SELECT
          *
        FROM users
        WHERE role = 'customer' AND (now() - created_at) <= interval '30 days';
        `,
        { type: QueryTypes.SELECT }
      );
      res.json(response);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      res.status(500).json({ error: "Erro ao buscar dados!" });
    }
  },
  validate: async (req: any, res: any): Promise<void> => {
    try {
      let token: string = req.headers.authorization;
      if (token) {
        token = token.split(" ")[1];
        let funcao: any = jwt.verify(
          token,
          process.env.TOKEN_KEY || "IXCAGENDA"
        );
        console.log(error);

        return res.status(200).send({ role: funcao.role });
      }
    } catch (error: any) {
      res.status(400).send({
        type: "error",
        message: "Error",
        data: error.message,
      });
    }
  },
};

export default UserController;
