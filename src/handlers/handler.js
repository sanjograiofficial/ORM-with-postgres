import prisma from "../db/db.js";

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
      error: e,
    });
  }
};
const getStudentById = async (req, res) => {
  try {
    let matchStudent = await prisma.students.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!matchStudent) {
      return res.status(404).json({
        message: "No student found with that id",
      });
    }
    res.status(200).json({
      message: "Student found",
      data: matchStudent,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      message: "Failed to fetch student",
    });
  }
};
const createStudent = async (req, res) => {
  try {
    let data = req.body;
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
    });
  }
};
const updateStudent = async (req, res) => {
  try {
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
    });
  }
};
const deleteStudent = async (req, res) => {
  try {
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
