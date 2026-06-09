import prisma from "../db/db.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createTeacherService,
  deleteTeacherService,
  getAllTeachersService,
  getTeacherByIdService,
  updateTeacherService,
} from "../services/teachers.services.js";
import { validateAllFieldTypes } from "../validators/fieldValidators.js";

const getAllTeachers = asyncHandler(async (req, res) => {
  let allTeachers = await getAllTeachersService();
  if (allTeachers.length == 0) throw new Error("No student found");
  res.json({
    message: "All teachers found",
    data: allStudents,
  });
});
const getTeacherById = asyncHandler(async (req, res) => {
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
  let matchTeacher = await getTeacherByIdService(Number(id));
  res.status(200).json({
    message: "Teacher found",
    data: matchTeacher,
  });
});
const createTeacher = async (req, res) => {
  let data = req.body;
  let { name, email } = data;
  let validateMsg = validateAllFieldTypes("email", email);
  if (validateMsg != null) {
    return res.status(400).json({
      error: validateMsg,
    });
  }
  validateMsg = validateAllFieldTypes("name", name);
  if (validateMsg != null) {
    return res.status(400).json({
      error: validateMsg,
    });
  }
  let createdTeacher = await createTeacherService(data);
  res.status(201).json({
    message: "Teacher created successfully",
    data: createTeacher,
  });
};
const updateTeacher = async (req, res) => {
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
  let { name, email } = req.body;
  let updatedTeacher = await updateTeacherService(Number(id), data);
  res.status(200).json({
    message: "Teacher updated successfully",
    data: updateTeacher,
  });
};
const deleteTeacher = async (req, res) => {
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
  let deletedTeacher = await deleteTeacherService(Number(id));
  res.status(200).json({
    message: "Teacher deleted successfully",
    data: deleteTeacher,
  });
};

export {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
