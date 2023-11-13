import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import Users from "../models/Users";

interface DecodedToken extends Jwt, JwtPayload {
  userId?: number;
}

const getUserByToken = async (authorization: string | undefined): Promise<Users | null> => {
  try {
    if (!authorization) {
      return null;
    }

    const token = authorization.split(' ')[1] || null;

    if (!token) {
      return null;
    }

    const decodedToken = jwt.decode(token) as DecodedToken;

    if (!decodedToken || typeof decodedToken.userId !== "number") {
      return null;
    }

    const user = await Users.findOne({
      where: {
        id: decodedToken.userId
      }
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};

export default {
  getUserByToken
};
