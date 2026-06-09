import { Router } from "express";
import {
  createEnrollment,
  deleteEnrollment,
  getAllEnrollment,
  getEnrollmentById,
  updateEnrollment,
} from "../handlers/enrollmentHandler.js";

const router = Router();

router.get("/", getAllEnrollment);
router.get("/:id", getEnrollmentById);
router.post("/", createEnrollment);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);

export default router;
