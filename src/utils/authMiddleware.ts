import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Users from "../models/Users";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(200).send({
        type: 'error',
        message: 'Access Denied'
      });
    }

    const token = authorization.split(' ')[1] || null;

    if (!token) {
      return res.status(200).send({
        type: 'error',
        message: 'Token not found'
      });
    }

    const decodedToken = typeof token === 'string' ? jwt.decode(token) as JwtPayload : null;

    if (!decodedToken) {
      return res.status(200).send({
        type: 'error',
        message: 'Access Denied'
      });
    }

    if (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
      return res.status(200).send({
        type: 'error',
        message: 'Your session has expired! Log in again'
      });
    }

    const user = await Users.findOne({
      where: {
        id: decodedToken.userId
      }
    });

    if (!user) {
      return res.status(200).send({
        type: 'error',
        message: 'User not found'
      });
    }

    return next();
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Error'
    });
  }
};
