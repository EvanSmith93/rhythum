import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth";
import { convertToQuote, errorQuote } from "../services/quote";

export const router = Router();

router.get("/", verifyAuth, async (req, res) => {
  const quoteRes = await fetch("https://zenquotes.io/api/random", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const content = await quoteRes.json();
  const quote = quoteRes.status === 200 ? convertToQuote(content) : errorQuote;

  res.send(quote);
});
