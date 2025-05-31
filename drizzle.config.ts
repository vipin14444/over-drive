import { type Config } from "drizzle-kit";
import { env } from "~/env";

export const dbCredentials = {
  host: env.SINGLESTORE_HOST,
  port: parseInt(env.SINGLESTORE_PORT),
  user: env.SINGLESTORE_USER,
  database: env.SINGLESTORE_DATABASE,
  password: env.SINGLESTORE_PASSWORD,
  ssl: {},
};

export const tablePrefix = "overdrive_";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  tablesFilter: [`${tablePrefix}*`],
  dbCredentials: dbCredentials,
} satisfies Config;
