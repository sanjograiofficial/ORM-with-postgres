import prisma from "../db/db.js";
import { validateAllFieldTypes } from "../validators/fieldValidators.js";

const getAllStudents = async (req, res) => {
  try {
    let allStudents = await prisma.students.findMany();
    if (allStudents.length == 0) {
      return res.status(404).json({
        message: "No students found",
      });
    }
    res.json({
      message: "All students found",
      data: allStudents,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      message: "Failed to fetch students",
      stack: e?.message,
    });
  }
};
const getStudentById = async (req, res) => {
  try {
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
    let matchStudent = await prisma.students.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "Student found",
      data: matchStudent,
    });
  } catch (e) {
    if (e.code == "P2022") {
      return res.status(404).json({
        message: "No student found with that id",
      });
    }
    console.log(e);
    return res.json({
      message: "Failed to fetch student",
      stack: e?.message,
    });
  }
};
const createStudent = async (req, res) => {
  try {
    let { name, email } = req.body;
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
    let createdStudent = await prisma.students.create({
      data: data,
    });
    res.status(201).json({
      message: "Student created successfully",
      data: createdStudent,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      message: "Faile to create student",
      stack: e?.message,
    });
  }
};
const updateStudent = async (req, res) => {
  try {
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
    let updatedStudent = await prisma.students.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        email,
      },
    });
    if (updatedStudent) {
      return res.status(404).json({
        message: "No student found with that id",
      });
    }
    res.status(200).json({
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (e) {
    if (e.code === "P2025") {
      return res.status(404).json({
        message: "No student found with that id",
      });
    }
    console.log(e);
    return res.json({
      message: "Failed to update user",
      stack: e?.message,
    });
  }
};
const deleteStudent = async (req, res) => {
  try {
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
    let deletedStudent = await prisma.students.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({
      message: "Student deleted successfully",
      data: deletedStudent,
    });
  } catch (e) {
    if (e.code === "P2025") {
      return res.status(404).json({
        message: "No student found with that id",
      });
    }
    console.log(e);
    return res.json({
      message: "Failed to delete student",
      stack: e?.message,
    });
  }
};

export {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
