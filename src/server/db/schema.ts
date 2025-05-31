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
    owner: text("owner").notNull(),
  },
  (t) => {
    return [
      index("parentId_index").on(t.parentId),
      index("owner_index").on(t.owner),
    ];
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
    owner: text("owner").notNull(),
    url: text("url").notNull(),
  },
  (t) => {
    return [
      index("parentId_index").on(t.parentId),
      index("owner_index").on(t.owner),
    ];
  },
);

export const userTable = createTable(
  "user_table",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    uid: text("uid").notNull(),
    storageUsed: bigint("storageUsed", { mode: "bigint" }).notNull(),
    createdAt: datetime("created_at").notNull().default(new Date()),
    updatedAt: datetime("updated_at").notNull().default(new Date()),
  },
  (t) => {
    return [index("uid").on(t.uid)];
  },
);
