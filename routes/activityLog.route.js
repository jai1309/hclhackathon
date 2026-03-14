import { Router } from "express";
import {
  createActivityLog,
  getActivityLogsByUser,
  deleteActivityLog,
} from "../controllers/activityLog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", validateBody(["action"]), createActivityLog);
router.get("/", getActivityLogsByUser);
router.get("/:userId", getActivityLogsByUser);
router.delete("/:id", deleteActivityLog);

export default router;
