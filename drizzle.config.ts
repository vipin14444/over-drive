import { type Config } from "drizzle-kit";
import { env } from "~/env";

export const dbCredentials = {
  host: env.SINGLESTORE_HOST as string,
  port: parseInt(env.SINGLESTORE_PORT as string),
  user: env.SINGLESTORE_USER as string,
  database: env.SINGLESTORE_DATABASE as string,
  password: env.SINGLESTORE_PASSWORD as string,
  ssl: {},
};

export const tablePrefix = "overdrive_";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  tablesFilter: [`${tablePrefix}*`],
  dbCredentials: dbCredentials,
} satisfies Config;
