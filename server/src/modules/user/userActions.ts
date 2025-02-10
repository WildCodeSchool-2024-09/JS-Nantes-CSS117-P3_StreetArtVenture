import argon2d from "argon2";
import type { RequestHandler } from "express";

import jwt from "jsonwebtoken";
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

    req.body.decodedToken = decoded;
    res.status(200).json({ token, decodedToken: decoded });
  } catch (error) {
    res.status(401).json({ message: "Token invalide." });
  }
};

const verifyUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { email, password, reminder } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email et mot de passe requis" });
      return;
    }

    // 🔹 Récupérer l'utilisateur depuis la base de données
    const userArray = await userRepository.readPasswordHash(email);

    if (!userArray || userArray.length === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    const user = userArray[0]; // Extraction du premier utilisateur
    const passwordHash = user.password; // Supposons que c'est bien le hash stocké

    // 🔹 Vérifier le mot de passe avec Argon2
    const isPasswordValid = await argon2d.verify(passwordHash, password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Mot de passe incorrect" });
      return;
    }

    // 🔹 Générer le token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        isBanned: user.isBanned,
      },
      JWT_SECRET,
      { expiresIn: reminder },
    );

    res.status(200).json({ token });
    return;
  } catch (err) {
    next(err);
    return;
  }
};

const registration: RequestHandler = async (req, res, next) => {
  try {
    const {
      username,
      email,
      firstname,
      lastname,
      zipcode,
      city,
      password,
      adress,
    } = req.body;
    const isUser = await userRepository.isUserYet(username, email);

    if (isUser?.length) {
      res.status(409).json({ message: "Cet utilisateur existe deja", isUser });
    }
    {
      const insertId = await userRepository.userInscription(
        username,
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

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const hashedPassword = await argon2d.hash(req.body.password);

    req.body.password = hashedPassword;

    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

const patch: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const {
    username,
    firstname,
    lastname,
    email,
    zipcode,
    adress,
    city,
    password,
    points,
    isAdmin,
    isBanned,
    creation_date,
    last_connection,
  } = req.body;
  const user = await userRepository.patchName({
    id: Number.parseInt(id),
    username,
    firstname,
    lastname,
    email,
    zipcode,
    adress,
    city,
    password,
    points,
    isAdmin,
    isBanned,
    creation_date,
    last_connection,
  });
  if (!user.length) {
    res.sendStatus(404);
  } else {
    res.json(user);
  }
};

export default {
  verifyUser,
  verifyToken,
  read,
  update,
  deleteUser,
  patch,
  registration,
  hashPassword,
};
