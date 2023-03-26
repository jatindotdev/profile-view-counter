import { LocalStorage } from "https://deno.land/x/storage@0.0.5/mod.ts";

const db = new LocalStorage<string>("db.json");

// Get the count for a specific item by name
export function getCount(name: string): string {
  return (db.get(name) ?? 0).toString();
}

// Increment the count for a specific item by name
export function incrementCount(name: string) {
  const count = parseInt(getCount(name)) + 1;
  db.set(name, count.toString());
  db.save();
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
  db.save();
}
