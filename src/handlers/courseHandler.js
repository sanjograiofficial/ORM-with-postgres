import prisma from "../db/db.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { createCourseService, deleteCourseService, getAllCoursesService, getCourseByIdService, updateCourseService } from "../services/course.service.js";
import { validateAllFieldTypes } from "../validators/fieldValidators.js";

const getAllCourses = asyncHandler(async (req, res) => {
  let allCourses = await getAllCoursesService();
  if (allCourses.length == 0) throw new Error("No student found");

  res.json({
    message: "All Courses found",
    data: allCourses,
  });
});
const getCourseById = asyncHandler(async (req, res) => {
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
  let matchCourse = await getCourseByIdService(Number(id));
  res.status(200).json({
    message: "Course found",
    data: matchCourse,
  });
});
const createCourse = async (req, res) => {
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
  let createdCourse = await createCourseService(data);
  res.status(201).json({
    message: "Course created successfully",
    data: createdCourse,
  });
};
const updateCourse = async (req, res) => {
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
  let updatedCourse = await updateCourseService(Number(id), data);
  res.status(200).json({
    message: "Course updated successfully",
    data: updatedCourse,
  });
};
const deleteCourse = async (req, res) => {
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
  let deletedCourse = await deleteCourseService(Number(id));
  res.status(200).json({
    message: "Course deleted successfully",
    data: deletedCourse,
  });
};

export {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
