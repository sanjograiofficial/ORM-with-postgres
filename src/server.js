import express from "express";
import dotenv from "dotenv/config";
import studentRouter from "./routes/student_routes.js";

const app = express();
app.use(express.json());

let port = process.env.PORT || 8000;

app.use("/students", studentRouter);
app.get("/", (req, res) => {
  res.json({
    message: "Server started",
  });
});

app.listen(port, () => {
  console.log(`Server started at port: ${port}. http://localhost:${port}`);
});
