import express from "express";
import dotenv from "dotenv/config";

const app = express();
let port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({
    message: "This is ORM",
  });
});

app.listen(port, () => {
  console.log(`Server started at port: ${port}. http://localhost:${port}`);
});
