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

const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific user based on the provided ID
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (!user) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  // Get new infos + id from request
  const userId = Number(req.params.id);
  const updatedInfos = req.body;
  const user = await userRepository.update(userId, updatedInfos);
  if (!user.length) {
    res.sendStatus(404);
  } else {
    res.json(user);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user = await userRepository.delete(Number.parseInt(id));
  if (!user.length) {
    res.sendStatus(404);
  } else {
    res.json(user);
  }
};

const patch: RequestHandler = async (req, res, net) => {
  const { id } = req.params;
  const {
    name,
    firstname,
    lastname,
    email,
    zipcode,
    adress,
    city,
    password,
    points,
    is_admin,
    creation_date,
    last_connection,
  } = req.body;
  const user = await userRepository.patchName({
    id: Number.parseInt(id),
    name,
    firstname,
    lastname,
    email,
    zipcode,
    adress,
    city,
    password,
    points,
    is_admin,
    creation_date,
    last_connection,
  });
  if (!user.length) {
    res.sendStatus(404);
  } else {
    res.json(user);
  }
};

export default { verifyUser, verifyToken, read, update, deleteUser, patch };
