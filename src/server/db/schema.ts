import {
  bigint,
  text,
  datetime,
  singlestoreTableCreator,
  index,
} from "drizzle-orm/singlestore-core";
import { tablePrefix } from "drizzle.config";

const createTable = singlestoreTableCreator((name) => `${tablePrefix}${name}`);

export const folderTable = createTable(
  "folder_table",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    parentId: bigint("parentId", { mode: "bigint" }).notNull(),
    name: text("name").notNull().default(""),
    createdAt: datetime("created_at").notNull().default(new Date()),
    updatedAt: datetime("updated_at").notNull().default(new Date()),
    owner: bigint("owner", { mode: "bigint" }).notNull(),
  },
  (t) => {
    return [index("parentId_index").on(t.parentId)];
  },
);

export const fileTable = createTable(
  "file_table",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    parentId: bigint("parentId", { mode: "bigint" }).notNull(),
    name: text("name").notNull().default(""),
    type: text("type").notNull().default("file"),
    size: bigint("size", { mode: "bigint" }),
    createdAt: datetime("created_at").notNull().default(new Date()),
    updatedAt: datetime("updated_at").notNull().default(new Date()),
    owner: bigint("owner", { mode: "bigint" }).notNull(),
  },
  (t) => {
    return [index("parentId_index").on(t.parentId)];
  },
);
