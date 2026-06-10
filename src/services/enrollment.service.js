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
  const enrollment = await prisma.enrollments.update({
    where: {
      id,
    },
    data,
  });
  if (!enrollment) {
    return res.status(404).json({
      message: "No enrollment found with that id",
    });
  }
  return enrollment;
};

const deleteEnrollmentService = async (id) => {
  const enrollment = await prisma.enrollments.delete({
    where: {
      id,
    },
  });
  if (!enrollment) {
    return res.status(404).json({
      message: "No enrollment found with that id",
    });
  }
};

export {
  getAllEnrollmentService,
  getEnrollmentByIdService,
  createEnrollmentService,
  updateEnrollmentService,
  deleteEnrollmentService,
};
