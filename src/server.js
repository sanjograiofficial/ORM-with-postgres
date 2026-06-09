import express from "express";
import dotenv from "dotenv/config";
import routes from "./routes/routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

let port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({
    message: "Server started",
  });
});
app.use("/", routes);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server started at port: ${port}. http://localhost:${port}`);
});
