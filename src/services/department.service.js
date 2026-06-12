import prisma from "../db/db.js";

const getAllDepartmentsService = async () => {
  return await prisma.department.findMany({
    include: {
      students: true,
      teachers: true,
    },
  });
};

const getDepartmentByIdService = async (id) => {
  const department = await prisma.department.findUnique({
    where: {
      id,
    },
    include: {
      students: true,
      teachers: true,
    },
  });
  if (!department) throw new Error("No department found");
  return department;
};

const createDepartmentService = async (data) => {
  return await prisma.department.create({
    data,
  });
};

const updateDepartmentService = async (id, data) => {
  return await prisma.department.update({
    where: {
      id,
    },
    data,
  });
};

const deleteDepartmentService = async (id) => {
  return await prisma.department.delete({
    where: {
      id,
    },
  });
};

export {
  getAllDepartmentsService,
  getDepartmentByIdService,
  createDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
};
