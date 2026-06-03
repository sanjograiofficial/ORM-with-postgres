import prisma from "../db/db.js";

const getAllStudents = async (req, res) => {
  let allStudents = prisma.students.findMany();
  res.json({
    message: "All students found",
    data: allStudents,
  });
};
const getStudentById = async (req, res) => {};
const createStudent = async (req, res) => {};
const updateStudent = async (req, res) => {};
const deleteStudent = async (req, res) => {};

export {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
