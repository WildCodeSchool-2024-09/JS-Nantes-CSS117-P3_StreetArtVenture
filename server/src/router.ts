import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/item/leaderboard/leaderboardActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/leaderboard/getCities", userActions.getCities);
router.get("/leaderboard/getLeaderboard", userActions.getLeaderboard);
router.get("/leaderboard/getUserData/:id", userActions.getUserData);

/* ************************************************************************* */

export default router;
