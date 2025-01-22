import express from "express";

const router = express.Router();
router.use(express.json());
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import artActions from "./modules/art/artActions";
import artPieceActions from "./modules/art_piece/artPieceActions";
import itemActions from "./modules/item/itemActions";
import leaderboardActions from "./modules/leaderboard/leaderboardActions";
import userActions from "./modules/user/userActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.post("/user/verify", userActions.verifyUser);
router.post("/user/verifyToken", userActions.verifyToken);
router.get("/user/:id", userActions.read);
router.patch("/user/:id", userActions.update);

router.get("/leaderboard/getCities", leaderboardActions.getCities);
router.get("/leaderboard/getLeaderboard", leaderboardActions.getLeaderboard);
router.get("/leaderboard/getUserData/:id", leaderboardActions.getUserData);

router.get("/art/findArtPiecesAround", artActions.browseAround);
router.get("/art/latestArtPieceUnvelidated", artActions.unvalidatedArtPiece);
router.get("/art/getCities", artPieceActions.getCities);
router.patch("/art/artPieceValidation/:id", artActions.edit);
router.delete("/art/artPieceDenied/:id", artActions.deniedArtPiece);

/* ************************************************************************* */

export default router;
