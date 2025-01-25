import { Session, User } from "../utils/types";

export enum Schema {
  Sessions = "sessions",
  Users = "users",
}

type SchemaMapping = {
  [Schema.Sessions]: Session;
  [Schema.Users]: User;
};

type SchemaType<T extends Schema> = SchemaMapping[T];

export class LSHandler {
  setItem<T extends Schema>(key: T, items: SchemaType<T>[]) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  getItem<T extends Schema>(key: T): SchemaType<T>[] {
    return JSON.parse(localStorage.getItem(key) || "[]") || [];
  }
}
