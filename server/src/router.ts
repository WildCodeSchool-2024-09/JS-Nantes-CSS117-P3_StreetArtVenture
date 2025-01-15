import express from "express";

const router = express.Router();
router.use(express.json());
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import artActions from "./modules/art/artActions";
import itemActions from "./modules/item/itemActions";
import leaderboardActions from "./modules/leaderboard/leaderboardActions";
import userActions from "./modules/user/userActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/*** Users routes ***/

router.post("/user/verify", userActions.verifyUser);
router.post("/user/verifyToken", userActions.verifyToken);
router.get("/user/:id", userActions.read);
router.delete(
  "/user/:id" /* TODO middleware check admin */,
  userActions.deleteUser,
);
router.patch("/user/:id" /* TODO middleware check admin */, userActions.patch);

/*** Leaderboard routes ***/

router.get("/leaderboard/getCities", leaderboardActions.getCities);
router.get("/leaderboard/getLeaderboard", leaderboardActions.getLeaderboard);
router.get("/leaderboard/getUserData/:id", leaderboardActions.getUserData);

router.get(
  "/leaderboard/admin/getLeaderboard" /* TODO middleware check admin */,
  leaderboardActions.getAdminLeaderboard,
);

router.get("/art/findArtPiecesAround", artActions.browseAround);

import artPieceActions from "./modules/art_piece/artPieceActions";

router.get("/art/getCities", artPieceActions.getCities);

/* ************************************************************************* */

export default router;
