import express from "express";

const app = express();

app.post("/api/auth", async (req, res) => {
  res.send({ email: "marta@id.com" });
});

app.put("/api/auth", async (req, res) => {
  res.send({ email: "marta@id.com" });
});

app.delete("/api/auth", async (req, res) => {
  res.send({});
});

app.get("/api/user", async (req, res) => {
  res.send({ email: "marta@id.com" });
});

const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
