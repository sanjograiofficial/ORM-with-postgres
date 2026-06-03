import prisma from "../db/db.js";

const getAllStudents = async (req, res) => {
  let allStudents = prisma.students.findMany();
  res.json({
    message: "All students found",
    data: allStudents,
  });
};
const getStudentById = async (req, res) => {
  let matchStudent = await prisma.students.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.status(200).json({
    message: "Student found",
    data: matchStudent,
  });
};
const createStudent = async (req, res) => {
  let data = req.body;
  let createdStudent = await prisma.students.create({
    data: data,
  });
  res.status(200).json({
    message: "Student created successfully",
    data: createdStudent,
  });
};
const updateStudent = async (req, res) => {
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
  res.status(200).json({
    message: "Student updated successfully",
    data: updatedStudent,
  });
};
const deleteStudent = async (req, res) => {
  let deletedStudent = await prisma.students.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.status(200).json({
    message: "Student deleted successfully",
    data: deletedStudent,
  });
};

export {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
