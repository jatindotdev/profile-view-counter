import { openKVDb } from "https://deno.land/x/kv_sqlite@v0.1.7/mod.ts";

const db = openKVDb("db.sqlite3");

// Get the count for a specific item by name
export function getCount(name: string): string {
  return (db.get(name) ?? 0).toString();
}

// Increment the count for a specific item by name
export function incrementCount(name: string) {
  const count = parseInt(getCount(name)) + 1;
  db.set(name, count.toString());
}

// Get all items in the database
export function getAll() {
  const items = [];
  for (const key in db.keys) {
    items.push({
      name: key,
      count: db.get(key),
    });
  }
  return items;
}

export function eraseAll() {
  db.clear();
}
