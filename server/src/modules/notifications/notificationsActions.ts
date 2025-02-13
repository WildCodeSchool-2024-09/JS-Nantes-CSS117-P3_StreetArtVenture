import type { RequestHandler } from "express";

// Import access to data
import notificationsRepository from "./notificationsRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch specific notifications based on the provided ID
    const userId = Number(req.params.id);
    const notifications = await notificationsRepository.read(userId);

    // If the notifications are not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the notifications in JSON format
    if (!notifications) {
      res.sendStatus(404);
    } else {
      res.json(notifications);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const setRead: RequestHandler = async (req, res, next) => {
  try {
    // Set specific notifications to read based on the provided ID
    const userId = Number(req.params.id);
    const affectedNotifications = await notificationsRepository.setRead(userId);

    if (!affectedNotifications) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200).send(affectedNotifications);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { read, setRead };
