import prisma from "../db/db.js";

const getAllTeachersService = async () => {
  return await prisma.teacher.findMany();
};

const getTeacherByIdService = async (id) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      id,
    },
  });
  if (!teacher) throw new Error("No teacher found");
  return teacher;
};

const createTeacherService = async (data) => {
  return await prisma.teacher.create({
    data,
  });
};

const updateTeacherService = async (id, data) => {
  const teacher = await prisma.teacher.update({
    where: {
      id,
    },
    data: {
      id: Number,
      email: String,
      name: String,
      departmentId: Number,
    },
  });
  if (!teacher) {
    return res.status(404).json({
      message: "No teacher found with that id",
    });
  }
  return teacher;
};

const deleteTeacherService = async (id) => {
  const teacher = await prisma.teacher.delete({
    where: {
      id,
    },
  });
  if (!teacher) {
    return res.status(404).json({
      message: "No teacher found with that id",
    });
  }
};

export {
  getAllTeachersService,
  getTeacherByIdService,
  createTeacherService,
  updateTeacherService,
  deleteTeacherService,
};
