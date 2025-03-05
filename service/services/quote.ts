import { Quote } from "../types";

export const errorQuote: Quote = {
  text: "Error, could not get quote",
  author: "Rhythum",
};

export function convertToQuote(res: { q: string; a: string }[]): Quote {
  return { text: res[0].q, author: res[0].a };
}
