import { MongoClient } from "mongodb";
import { config } from "./dbConfig";

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
export const db = client.db("rhythum");
