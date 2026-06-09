import { Prisma } from "@prisma/client";

const errorHandler = (err, req, res, next) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err) {
      case "P2002":
        return res.status(409).json({
          message: "A record with this value already exists",
        });
        break;

      case "P2025":
        return res.status(404).json({
          message: "Record not found",
        });
        break;

    //   case "P2022":
    //     return res.status(404).json({
    //       message: "No student found with that id",
    //     });
    //     break;
    }
  }
  return res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
