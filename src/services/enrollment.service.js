import prisma from "../db/db.js";

const getAllEnrollmentService = async () => {
  return await prisma.enrollments.findMany({
    include: {
      student: true,
      course: true,
    },
  });
};

const getEnrollmentByIdService = async (id) => {
  const enrollment = await prisma.enrollments.findUnique({
    where: {
      id,
    },
    include: {
      student: true,
      course: true,
    },
  });
  if (!enrollment) throw new Error("No enrollment found");
  return enrollment;
};

const createEnrollmentService = async (data) => {
  return await prisma.enrollments.create({
    data,
  });
};

const updateEnrollmentService = async (id, data) => {
  return await prisma.enrollments.update({
    where: {
      id,
    },
    data,
  });
};

const deleteEnrollmentService = async (id) => {
  return await prisma.enrollments.delete({
    where: {
      id,
    },
  });
};

export {
  getAllEnrollmentService,
  getEnrollmentByIdService,
  createEnrollmentService,
  updateEnrollmentService,
  deleteEnrollmentService,
};
