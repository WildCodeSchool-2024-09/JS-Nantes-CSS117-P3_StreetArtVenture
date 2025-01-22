import path from "node:path";
import express from "express";
import multer from "multer";

const router = express.Router();
router.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

import artActions from "./modules/art/artActions";
import artPieceActions from "./modules/art_piece/artPieceActions";
import authActions from "./modules/auth/authActions";
import leaderboardActions from "./modules/leaderboard/leaderboardActions";
import statisticsActions from "./modules/statistics/statisticsActions";
import userActions from "./modules/user/userActions";

/* ************************** PUBLIC ACTIONS ************************** */

/* ************************** LOGGED USERS ACTIONS ************************** */
// router.use(authActions.verifyToken); TODO uncomment after login implementation

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
router.get("/user/:id", userActions.read);
router.delete("/user/:id", userActions.deleteUser);
router.get("/statistics/user", statisticsActions.getUserStatistics);
router.get("/statistics/art_piece", statisticsActions.getArtPiecesStatistics);
router.post("/api/upload", upload.single("image"), (req, res) => {
  res.send({ message: "Image Uploaded" });
});

/* ******************************************************************** */

router.post("/user/verify", userActions.verifyUser);
router.post("/user/verifyToken", userActions.verifyToken);

export default router;
