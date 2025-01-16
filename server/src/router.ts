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
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/api/upload", upload.single("image"), (req, res) => {
  res.send({ message: "Image Uploaded" });
});

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

router.post("/user/verify", userActions.verifyUser);
router.post("/user/verifyToken", userActions.verifyToken);
router.get("/user/:id", userActions.read);
router.patch("/user/:id", userActions.update);

router.get("/leaderboard/getCities", leaderboardActions.getCities);
router.get("/leaderboard/getLeaderboard", leaderboardActions.getLeaderboard);
router.get("/leaderboard/getUserData/:id", leaderboardActions.getUserData);

router.get("/art/findArtPiecesAround", artActions.browseAround);

import artPieceActions from "./modules/art_piece/artPieceActions";

router.get("/art/getCities", artPieceActions.getCities);

/* ************************************************************************* */

export default router;
