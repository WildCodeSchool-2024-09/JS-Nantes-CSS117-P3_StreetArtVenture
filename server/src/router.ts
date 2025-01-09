import express from "express";
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";

const router = express.Router();
router.use(express.json());
/* ************************************************************************* */
// Define Your API Routes Here

/* ************************************************************************* */

// Define item-related routes
import leaderboardActions from "./modules/leaderboard/leaderboardActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);
router.post("/user/verify", userActions.verifyUser);
router.post("/user/verifyToken", userActions.verifyToken);

router.get("/leaderboard/getCities", leaderboardActions.getCities);
router.get("/leaderboard/getLeaderboard", leaderboardActions.getLeaderboard);
router.get("/leaderboard/getUserData/:id", leaderboardActions.getUserData);

import { browse } from "./modules/art_piece/artPieceActions";

router.get("/api/art", browse);

/* ************************************************************************* */

export default router;
