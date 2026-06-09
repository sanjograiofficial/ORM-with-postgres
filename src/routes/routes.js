import { Router } from "express";
import studentRouter from "./studentRouter.js";
import teacherRouter from "./teacherRouter.js";
import courseRouter from "./courseRouter.js";
import enrollmentRouter from "./enrollmentRouter.js";
import departmentRouter from "./departmentRouter.js";

let router = Router();

router.get("/", (req, res) => {
  res.send("Home page");
});
router.use("/students", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/course", courseRouter);
router.use("/department", departmentRouter);
router.use("/enrollment", enrollmentRouter);

export default router;
