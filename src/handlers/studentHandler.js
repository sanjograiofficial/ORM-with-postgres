import prisma from "../db/db.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createStudentService,
  createStudentWithDepartmentService,
  deleteStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
} from "../services/students.service.js";
import { validateAllFieldTypes } from "../validators/fieldValidators.js";

const getAllStudents = asyncHandler(async (req, res) => {
  let allStudents = await getAllStudentsService();
  if (allStudents.length == 0) throw new Error("No student found");
  res.json({
    message: "All students found",
    data: allStudents,
  });
});
const getStudentById = asyncHandler(async (req, res) => {
  let { id } = req.params;
  if (id == "") {
    return res.status(400).json({
      error: "Id cannot be empty",
    });
  }
  if (isNaN(id)) {
    return res.status(400).json({
      error: "Id must be a number",
    });
  }
  let matchStudent = await getStudentByIdService(Number(id));
  res.status(200).json({
    message: "Student found",
    data: matchStudent,
  });
});
const createStudent = async (req, res) => {
  let data = req.body;
  let createdStudent = await createStudentService(data);
  res.status(201).json({
    message: "Student created successfully",
    data: createdStudent,
  });
};
const createStudentWithDepartment = async (req, res) => {
  let data = req.body;
  // console.log(data);

  let createdStudent = await createStudentWithDepartmentService(data);
  console.log(createdStudent);
  
  res.status(201).json({
    message: "Student created successfully",
    data: createdStudent,
  });
};
const updateStudent = async (req, res) => {
  let id = req.params;
  if (id == "") {
    return res.status(400).json({
      error: "Id cannot be empty",
    });
  }
  if (isNaN(id)) {
    return res.status(400).json({
      error: "Id must be a number",
    });
  }
  let data = req.body;
  let { name, email, departmentId } = req.body;
  let updatedStudent = await updateStudentService(Number(id), data);
  res.status(200).json({
    message: "Student updated successfully",
    data: updatedStudent,
  });
};
const deleteStudent = async (req, res) => {
  let id = req.params;
  if (id == "") {
    return res.status(400).json({
      error: "Id cannot be empty",
    });
  }
  if (isNaN(id)) {
    return res.status(400).json({
      error: "Id must be a number",
    });
  }
  let deletedStudent = await deleteStudentService(Number(id));
  res.status(200).json({
    message: "Student deleted successfully",
    data: deletedStudent,
  });
};

export {
  getAllStudents,
  getStudentById,
  createStudent,
  createStudentWithDepartment,
  updateStudent,
  deleteStudent,
};
