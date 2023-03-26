// Get the count for a specific item by name
export function getCount(name: string): string {
  return (localStorage.getItem(name) ?? 0).toString();
}

// Increment the count for a specific item by name
export function incrementCount(name: string) {
  const count = parseInt(getCount(name)) + 1;
  localStorage.setItem(name, count.toString());
}

// Get all items in the database
export function getAll() {
  const items = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      items.push({
        name: key,
        count: getCount(key),
      });
    }
  }
  return items;
}

export function eraseAll() {
  localStorage.clear();
}
