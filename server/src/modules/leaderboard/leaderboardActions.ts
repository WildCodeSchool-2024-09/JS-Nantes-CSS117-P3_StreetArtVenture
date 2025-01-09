import type { RequestHandler } from "express";

import leaderboardRepository from "./leaderboardRepository";

const getCities: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all different cities
    const cities = await leaderboardRepository.getCities();

    // Respond with the cities in JSON format
    const cityNames = cities.map((el) => el.city);

    res.json(cityNames);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getLeaderboard: RequestHandler = async (req, res, next) => {
  try {
    const { city, name, offset } = req.query;
    // Fetch top 10 from (optionnal) city and name, optionnal offset
    const users = await leaderboardRepository.getLeaderboard(
      city as string,
      name as string,
      offset as string,
    );

    // Respond with the users informations in JSON format
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUserData: RequestHandler = async (req, res, next) => {
  try {
    // Fetch user leaderboard data
    const { id } = req.params;
    const users = await leaderboardRepository.getUserData(id);

    // Respond with the leaderboard user data
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export default { getCities, getLeaderboard, getUserData };
