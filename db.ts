import { DB, Row } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";

const db = new DB("items.db");

// Get the count for a specific item by name
export function getCount(name: string): number {
  const item = db.query("SELECT count FROM items WHERE name = ?", [name]);
  if (item.length === 0) {
    throw new Error(`Item with name '${name}' not found`);
  }
  return item[0][0] as number;
}

// Increment the count for a specific item by name
export function incrementCount(name: string) {
  db.query("INSERT OR IGNORE INTO items (name, count) VALUES (?, 0)", [name]);
  db.query("UPDATE items SET count = count + 1 WHERE name = ?", [name]);
}

// Get all items in the database
export function getAll(): Row[] {
  const items: Row[] = db.query("SELECT id, name, count FROM items");
  return items;
}

export function eraseAll() {
  db.query("DELETE FROM items");
}

db.query(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      count UNSIGNED INTEGER
    )
`);
