import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "./server/.env" });
import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

const verifyToken: RequestHandler = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.status(401).json({ message: "Token manquant." });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    req.body = decoded;
    res.status(200).json({ token });
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide." });
  }
};

const verifyUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, reminder } = req.body;
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
        { expiresIn: reminder },
      );
      res.status(200).json({ token });
    }
  } catch (err) {
    next(err);
  }
};

const inscription: RequestHandler = async (req, res, next) => {
  try {
    const {
      name,
      email,
      firstname,
      lastname,
      zipcode,
      city,
      password,
      adress,
    } = req.body;
    const isUser = await userRepository.isUserYet(name, email);

    if (isUser?.length) {
      res.status(409).json({ message: "Cet utilisateur existe deja", isUser });
    }
    {
      const insertId = await userRepository.userInscription(
        name,
        firstname,
        lastname,
        email,
        zipcode,
        adress,
        city,
        password,
      );

      if (!insertId) {
        res.status(500).json({
          message:
            "Il y a eu un probleme lors de votre inscription, veuillez reessayer",
        });
      } else {
        res
          .status(201)
          .json({ insertId, message: "Utilisateur créé avec succès" });
      }
    }
  } catch (err) {
    next(err);
  }
};

export default { verifyUser, verifyToken, inscription };
