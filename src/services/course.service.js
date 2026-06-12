import prisma from "../db/db.js";

const getAllCoursesService = async () => {
  return await prisma.course.findMany({
    include: {
      teachers: true,
    },
  });
};

const getCourseByIdService = async (id) => {
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      teachers: true,
    },
  });
  if (!course) throw new Error("No course found");
  return course;
};

const createCourseService = async (data) => {
  return await prisma.course.create({
    data,
  });
};

const updateCourseService = async (id, data) => {
  return await prisma.course.update({
    where: {
      id,
    },
    data,
  });
};

const deleteCourseService = async (id) => {
  return await prisma.course.delete({
    where: {
      id,
    },
  });
};

export {
  getAllCoursesService,
  getCourseByIdService,
  createCourseService,
  updateCourseService,
  deleteCourseService,
};
