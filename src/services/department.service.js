import prisma from "../db/db.js";


const getAllDepartmentsService = async () => {
  return await prisma.department.findMany();
};

const getDepartmentByIdService = async (id) => {
  const department = await prisma.department.findUnique({
    where: {
      id,
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
  const department = await prisma.department.update({
    where: {
      id,
    },
    data,
  });
  if (!department) {
    return res.status(404).json({
      message: "No department found with that id",
    });
  }
  return department;
};

const deleteDepartmentService = async (id) => {
  const department = await prisma.department.delete({
    where: {
      id,
    },
  });
  if (!department) {
    return res.status(404).json({
      message: "No department found with that id",
    });
  }
};

export {
  getAllDepartmentsService,
  getDepartmentByIdService,
  createDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
};
