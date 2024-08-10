import { db, Users } from "astro:db";
import { nanoid } from "nanoid";
// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Users).values([
    { id: nanoid(32), email: "test1@email.com" },
    { id: nanoid(32), email: "test2@email.com" },
  ]);
}
