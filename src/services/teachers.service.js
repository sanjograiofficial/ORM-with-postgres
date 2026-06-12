import prisma from "../db/db.js";

const getAllTeachersService = async () => {
  return await prisma.teacher.findMany({
    include: {
      department: true,
    },
  });
};

const getTeacherByIdService = async (id) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      id,
    },
    include: {
      department: true,
    },
  });
  if (!teacher) throw new Error("No teacher found");
  return teacher;
};

const createTeacherService = async (data) => {
  const { name, email, departmentId } = data;
  return await prisma.teacher.create({
    data: {
      name,
      email,
      department: { connect: { id: departmentId } },
    },
  });
};
const createTeacherWithDepartmentService = async (data) => {
  const { name, email, departmentName } = data;
  return await prisma.teacher.create({
    data: {
      name,
      email,
      department: { create: { name: departmentName } },
    },
  });
};

const updateTeacherService = async (id, data) => {
  const { name, email, departmentId } = data;
  return await prisma.teacher.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      department: {
        connect: { id: departmentId },
      },
    },
  });
};

const deleteTeacherService = async (id) => {
  return await prisma.teacher.delete({
    where: {
      id,
    },
  });
};

export {
  getAllTeachersService,
  getTeacherByIdService,
  createTeacherService,
  updateTeacherService,
  deleteTeacherService,
};
