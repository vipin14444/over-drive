import { eq } from "drizzle-orm";
import { db } from ".";
import { fileTable, folderTable } from "./schema";
import type { FileModel, FolderModel } from "~/types";

export const QUERIES = {
  getFolders: async (parentId: number) => {
    return db
      .select()
      .from(folderTable)
      .where(eq(folderTable.parentId, BigInt(parentId)))
      .then((res) => res as FolderModel[]);
  },
  getFiles: async (parentId: number) => {
    return db
      .select()
      .from(fileTable)
      .where(eq(fileTable.parentId, BigInt(parentId)))
      .then((res) => res as FileModel[]);
  },
  getDriveExplorerData: async (parentId: number) => {
    const folders = await QUERIES.getFolders(parentId);
    const files = await QUERIES.getFiles(parentId);

    return {
      folders,
      files,
    };
  },
};
