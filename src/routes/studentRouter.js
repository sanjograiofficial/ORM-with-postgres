import {
  createStudent,
  createStudentWithDepartment,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../handlers/studentHandler.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.post("/", createStudent);
router.post("/with-depart", createStudentWithDepartment);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
