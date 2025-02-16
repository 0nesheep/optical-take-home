export const database = new Map<string, number>();

export function seedDatabase() {
  database.set('Alex', 3000.0);
  database.set('Bryan', 3500.0);
  database.set('Chris', 2000.0);
  database.set('Dave', -100.0);
}
