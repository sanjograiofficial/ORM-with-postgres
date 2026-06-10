import prisma from "../db/db.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createDepartmentService,
  deleteDepartmentService,
  getAllDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentService,
} from "../services/department.service.js";
import { validateAllFieldTypes } from "../validators/fieldValidators.js";

const getAllDepartments = asyncHandler(async (req, res) => {
  let allDepartments = await getAllDepartmentsService();
  if (allDepartments.length == 0) throw new Error("No department found");

  res.json({
    message: "All Departments found",
    data: allDepartments,
  });
});
const getDepartmentById = asyncHandler(async (req, res) => {
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
  let matchDepartment = await getDepartmentByIdService(Number(id));
  res.status(200).json({
    message: "Department found",
    data: matchDepartment,
  });
});
const createDepartment = async (req, res) => {
  let data = req.body;
  // let { name, email } = data;
  // let validateMsg = validateAllFieldTypes("email", email);
  // if (validateMsg != null) {
  //   return res.status(400).json({
  //     error: validateMsg,
  //   });
  // }
  // validateMsg = validateAllFieldTypes("name", name);
  // if (validateMsg != null) {
  //   return res.status(400).json({
  //     error: validateMsg,
  //   });
  // }
  let createdDepartment = await createDepartmentService(data);
  res.status(201).json({
    message: "Department created successfully",
    data: createdDepartment,
  });
};
const updateDepartment = async (req, res) => {
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
  let updatedDepartment = await updateDepartmentService(Number(id), data);
  res.status(200).json({
    message: "Department updated successfully",
    data: updatedDepartment,
  });
};
const deleteDepartment = async (req, res) => {
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
  let deletedDepartment = await deleteDepartmentService(Number(id));
  res.status(200).json({
    message: "Department deleted successfully",
    data: deletedDepartment,
  });
};

export {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
