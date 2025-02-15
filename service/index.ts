import cookieParser from "cookie-parser";
import express from "express";
import { Quote } from "./types";
import { verifyAuth } from "./middlewares/verifyAuth";
import { router as authRouter } from "./routes/auth";
import { router as sessionRouter } from "./routes/session";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/sessions", sessionRouter);

const errorQuote: Quote = {
  text: "Error, could not get quote",
  author: "Rhythum",
};

app.get("/api/quote", verifyAuth, async (req, res) => {
  const quoteRes = await fetch("https://zenquotes.io/api/random", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const content = await quoteRes.json();
  const quote = quoteRes.status === 200 ? convertToQuote(content) : errorQuote;

  res.send(quote);
});

app.get("/api/user/me", verifyAuth, async (req, res) => {
  res.send({ email: res.locals.user.email });
});

const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

function convertToQuote(res: { q: string; a: string }[]): Quote {
  return { text: res[0].q, author: res[0].a };
}
