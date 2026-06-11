import prisma from "../db/db.js";

const getAllStudentsService = async () => {
  const student = await prisma.students.findMany({
    include: {
      department: true,
      enrollments: true,
    },
  });
  return student;
};

const getStudentByIdService = async (id) => {
  const student = await prisma.students.findUnique({
    where: {
      id,
    },
    include: {
      department: true,
      enrollments: true,
    },
  });
  if (!student) throw new Error("No student found");
  return student;
};

const createStudentService = async (data) => {
  return await prisma.students.create({
    data,
  });
};

const updateStudentService = async (id, data) => {
  const { name, email, rollNo, departmentId } = data;
  const student = await prisma.students.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      rollNo,
      department: {
        connect: { id: departmentId },
      },
    },
  });
  if (!student) {
    return res.status(404).json({
      message: "No student found with that id",
    });
  }
  return student;
};

const deleteStudentService = async (id) => {
  const student = await prisma.students.delete({
    where: {
      id,
    },
  });
  if (!student) {
    return res.status(404).json({
      message: "No student found with that id",
    });
  }
};

export {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
};
