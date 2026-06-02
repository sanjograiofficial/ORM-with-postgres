app.get("/", (req, res) => {
  res.json({
    message: "Server started",
  });
});