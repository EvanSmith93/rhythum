import cookieParser from "cookie-parser";
import express from "express";
import { router as authRouter } from "./routes/auth";
import { router as sessionRouter } from "./routes/session";
import { router as quoteRouter } from "./routes/quote";
import { socket } from "./routes/socket";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/quotes", quoteRouter);

app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

const port = process.argv.length > 2 ? process.argv[2] : 3000;
const httpServer = app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

socket(httpServer);