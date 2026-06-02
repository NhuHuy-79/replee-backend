import { Router } from "express";
import { deleteImage } from "../controllers/file.controllers";
import { firebaseAuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.post("/delete", firebaseAuthMiddleware, deleteImage);

export default router;