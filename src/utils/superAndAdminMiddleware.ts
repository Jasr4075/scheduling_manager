import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(' ')[1] || null;
    
    if (!token) {
      return res.status(403).send({
        type: 'warning',
        message: 'Token not found.'
      });
    }
    
    const decodedToken = jwt.decode(token) as JwtPayload | null;

    if (!decodedToken || decodedToken.role === "customer") {
      return res.status(403).send({
        type: 'warning',
        message: 'Access Denied'
      });
    }

    next();
  } catch (error: any) {
    return res.status(500).send({
      type: 'error',
      message: 'Error',
      data: error.message
    });
  }
};
