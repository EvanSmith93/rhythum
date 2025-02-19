import cookieParser from "cookie-parser";
import express from "express";
import { router as authRouter } from "./routes/auth";
import { router as sessionRouter } from "./routes/session";
import { router as quoteRouter } from "./routes/quote";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/quotes", quoteRouter);

const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
