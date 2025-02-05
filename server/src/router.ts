import express from "express";
import artActions from "./modules/art/artActions";
import artPieceActions from "./modules/art_piece/artPieceActions";
import leaderboardActions from "./modules/leaderboard/leaderboardActions";
import notificationsActions from "./modules/notifications/notificationsActions";
import reportedArtPieceActions from "./modules/reported_art_piece/reportedArtPieceActions";
import statisticsActions from "./modules/statistics/statisticsActions";
import userActions from "./modules/user/userActions";
// import { getUserSignalement } from "./modules/reported_art_piece/reportedArtPieceActions";

const router = express.Router();
router.use(express.json());
/* ************************** PUBLIC ACTIONS ************************** */

/* ************************** LOGGED USERS ACTIONS ************************** */
// router.use(authActions.verifyToken); TODO uncomment after login implementation

router.get("/notifications/:id", notificationsActions.read);
router.patch("/notifications/:id", notificationsActions.setRead);
router.get("/user/reporting", reportedArtPieceActions.getUserSignalement);
router.get("/art/findArtPiecesAround", artActions.browseAround);
router.get("/art/getCities", artPieceActions.getCities);
router.get("/leaderboard/getCities", leaderboardActions.getCities);
router.get("/leaderboard/getLeaderboard", leaderboardActions.getLeaderboard);
router.get("/leaderboard/getUserData/:id", leaderboardActions.getUserData);
router.patch("/user/:id", userActions.patch); // TODO US-36

/* ************************** ADMIN ACTIONS ************************** */
// router.use(authActions.verifyAdmin); TODO uncomment after login implementation

router.get(
  "/leaderboard/admin/getLeaderboard",
  leaderboardActions.getAdminLeaderboard,
);
router.patch("/reports/validate/:id", reportedArtPieceActions.validate);
router.delete("/reports/refuse/:id", reportedArtPieceActions.refuse);
router.get("/user/:id", userActions.read);
router.delete("/user/:id", userActions.deleteUser);
router.get("/artPiece", artActions.readAll);
router.get("/statistics/user", statisticsActions.getUserStatistics);
router.get("/statistics/art_piece", statisticsActions.getArtPiecesStatistics);
router.get("/statistics/player", statisticsActions.getPlayerStatistics);

router.post("/api/upload", artActions.savePicture, artActions.multerAndSkully);

router.post("/art/newArt", artActions.updateAccepted);

/* ******************************************************************** */
router.get("/art/latestArtPieceUnvelidated", artActions.unvalidatedArtPiece);
router.patch("/art/artPieceValidation/:id", artActions.editArtPiece);
router.delete("/art/artPieceDenied/:id", artActions.denyArtPiece);
router.post("/user/verify", userActions.verifyUser);
router.post("/user/verifyToken", userActions.verifyToken);
router.post(
  "/user/registration",
  userActions.hashPassword,
  userActions.registration,
);

export default router;
