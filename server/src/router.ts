import express from "express";
import artActions from "./modules/art/artActions";
import artPieceActions from "./modules/art_piece/artPieceActions";
import authActions from "./modules/auth/authActions";
import leaderboardActions from "./modules/leaderboard/leaderboardActions";
import notificationsActions from "./modules/notifications/notificationsActions";
import reportedArtPieceActions from "./modules/reported_art_piece/reportedArtPieceActions";
import statisticsActions from "./modules/statistics/statisticsActions";
import userActions from "./modules/user/userActions";
// import { getUserSignalement } from "./modules/reported_art_piece/reportedArtPieceActions";

const router = express.Router();
router.use(express.json());
/* ************************** PUBLIC ACTIONS ************************** */
router.get("/leaderboard/getCities", leaderboardActions.getCities);
router.get("/leaderboard/getLeaderboard", leaderboardActions.getLeaderboard);
router.get("/user/:id", userActions.read);
router.get("/art/getCities", artPieceActions.getCities);
router.get("/artPiece", artActions.readAll);
router.post("/user/verify", userActions.verifyUser);
router.post("/user/verifyToken", userActions.verifyToken);
router.post(
  "/user/registration",
  userActions.hashPassword,
  userActions.registration,
);
router.post("/api/upload", artActions.savePicture, artActions.multerAndSkully);
/* ************************** LOGGED USERS ACTIONS ************************** */
router.use(authActions.verifyToken);
router.get("/notifications/:id", notificationsActions.read); //
router.patch("/notifications/:id", notificationsActions.setRead); //
router.get("/leaderboard/getUserData/:id", leaderboardActions.getUserData); //
router.patch("/user/:id", userActions.patch); // TODO US-36
router.get("/art/findArtPiecesAround", artActions.browseAround); //
router.post("/art/newArt", artActions.updateAccepted); //
router.post("/user/artVerification", userActions.isSeen);
router.post("/user/addpoint", userActions.addpoint);
/* ************************** ADMIN ACTIONS ************************** */
router.use(authActions.verifyAdmin);

router.get(
  "/leaderboard/admin/getLeaderboard",
  leaderboardActions.getAdminLeaderboard,
);
router.patch("/art/artPieceValidation/:id", artActions.editArtPiece); //
router.patch("/reports/validate/:id", reportedArtPieceActions.validate); //
router.delete("/reports/refuse/:id", reportedArtPieceActions.refuse); //
router.delete("/user/:id", userActions.deleteUser); //
router.get("/statistics/user", statisticsActions.getUserStatistics); //
router.get("/statistics/art_piece", statisticsActions.getArtPiecesStatistics); //
router.get("/statistics/player", statisticsActions.getPlayerStatistics); //
router.get("/user/reporting", reportedArtPieceActions.getUserSignalement); //
/* ******************************************************************** */

router.get("/art/latestArtPieceUnvelidated", artActions.unvalidatedArtPiece); //
router.delete("/art/artPieceDenied/:id", artActions.denyArtPiece); //

export default router;
