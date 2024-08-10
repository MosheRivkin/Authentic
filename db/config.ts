import { defineDb, defineTable, column } from "astro:db";

const Users = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    email: column.text({ unique: true }),
    hashed_password: column.text({ optional: true }),
    googleId: column.text({ optional: true }),
    facebookId: column.text({ optional: true }),
    appleId: column.text({ optional: true }),
  },
});

const Sessions = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expiresAt: column.date(),
    userId: column.text({
      references: () => Users.columns.id,
    }),
  },
});

export default defineDb({
  tables: {
    Users,
    Sessions,
  },
});
