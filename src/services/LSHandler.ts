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
  setItems<T extends Schema>(key: T, items: SchemaType<T>[]) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  getItems<T extends Schema>(key: T): SchemaType<T>[] {
    return JSON.parse(localStorage.getItem(key) || "[]") || [];
  }

  addItem<T extends Schema>(key: T, item: SchemaType<T>) {
    const items = this.getItems(key);
    items.push(item);
    this.setItems(key, items);
  }

  updateItem<T extends Schema>(key: T, item: SchemaType<T>) {
    const items = this.getItems(key).filter((i) => i.id !== item.id);
    items.push(item);
    this.setItems(key, items);
  }
}
