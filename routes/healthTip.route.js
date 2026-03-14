import { Router } from "express";
import {
  createHealthTip,
  getAllHealthTips,
  getHealthTipById,
  updateHealthTip,
  deleteHealthTip,
} from "../controllers/healthTip.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";

const router = Router();

router.use(verifyJWT);

router.get("/", getAllHealthTips);
router.get("/:id", getHealthTipById);
router.post(
  "/",
  authorizeRoles("provider"),
  validateBody(["tip_id", "title", "content"]),
  createHealthTip,
);
router.patch("/:id", authorizeRoles("provider"), updateHealthTip);
router.delete("/:id", authorizeRoles("provider"), deleteHealthTip);

export default router;
