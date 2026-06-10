import prisma from "../db/db.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { createEnrollmentService, deleteEnrollmentService, getAllEnrollmentService, getEnrollmentByIdService, updateEnrollmentService } from "../services/enrollment.service.js";
import { validateAllFieldTypes } from "../validators/fieldValidators.js";

const getAllEnrollment = asyncHandler(async (req, res) => {
  let allEnrollment = await getAllEnrollmentService();
  if (allEnrollment.length == 0) throw new Error("No enrollment found");
  
  res.json({
    message: "All Enrollment found",
    data: allEnrollment,
  });
});
const getEnrollmentById = asyncHandler(async (req, res) => {
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
  let matchEnrollment = await getEnrollmentByIdService(Number(id));
  res.status(200).json({
    message: "Enrollment found",
    data: matchEnrollment,
  });
});
const createEnrollment = async (req, res) => {
  let data = req.body;
  let { name, email } = data;
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
  let createdEnrollment = await createEnrollmentService(data);
  res.status(201).json({
    message: "Enrollment created successfully",
    data: createdEnrollment,
  });
};
const updateEnrollment = async (req, res) => {
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
  let updatedEnrollment = await updateEnrollmentService(Number(id), data);
  res.status(200).json({
    message: "Enrollment updated successfully",
    data: updatedEnrollment,
  });
};
const deleteEnrollment = async (req, res) => {
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
  let deletedEnrollment = await deleteEnrollmentService(Number(id));
  res.status(200).json({
    message: "Enrollment deleted successfully",
    data: deletedEnrollment,
  });
};

export {
  getAllEnrollment,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};
