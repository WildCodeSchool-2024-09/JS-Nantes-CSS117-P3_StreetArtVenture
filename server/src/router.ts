import express from "express";
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";

const router = express.Router();
router.use(express.json());
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);
router.post("/user/verify", userActions.verifyUser);
router.post("/user/verifyToken", userActions.verifyToken);

/* ************************************************************************* */

export default router;
