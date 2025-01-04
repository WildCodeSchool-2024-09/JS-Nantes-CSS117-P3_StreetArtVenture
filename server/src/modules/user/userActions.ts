import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "./server/.env" });
import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

const verifyUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.verifyUser(email, password);

    if (user == null) {
      res.status(404).json({ message: "utilisateur non trouvé" });
    } else {
      const token = jwt.sign(
        {
          id: user[0].id,
          email: user[0].email,
          is_admin: user[0].is_admin,
        },
        JWT_SECRET,
        { expiresIn: "30d" },
      );
      res.status(200).json({ token });
    }
  } catch (err) {
    next(err);
  }
};

export default { verifyUser };
