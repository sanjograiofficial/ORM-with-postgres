import prisma from "../db/db.js";

const getAllUsersService = async () => {
  return await prisma.users.findMany({
    include: {
      students: true,
      teachers: true,
    },
  });
};

const getUserByIdService = async (id) => {
  const users = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  if (!users) throw new Error("No users found");
  return users;
};

const createUserService = async (data) => {
  return await prisma.users.create({
    data,
  });
};

const updateUserService = async (id, data) => {
  return await prisma.users.update({
    where: {
      id,
    },
    data,
  });
};

const deleteUserService = async (id) => {
  return await prisma.users.delete({
    where: {
      id,
    },
  });
};

export {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
};
