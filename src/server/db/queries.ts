import { and, eq } from "drizzle-orm";
import { db } from ".";
import { fileTable, folderTable } from "./schema";
import type { FileModel, FolderModel } from "~/types";
import { auth } from "@clerk/nextjs/server";

export const QUERIES = {
  getFolders: async (parentId: number) => {
    const user = await auth();
    if (!user.userId) {
      throw new Error("User not authenticated");
    }

    return db
      .select()
      .from(folderTable)
      .where(
        and(
          eq(folderTable.owner, user.userId),
          eq(folderTable.parentId, BigInt(parentId)),
        ),
      )
      .then((res) => res as FolderModel[]);
  },
  getFiles: async (parentId: number) => {
    const user = await auth();
    if (!user.userId) {
      throw new Error("User not authenticated");
    }

    return db
      .select()
      .from(fileTable)
      .where(
        and(
          eq(fileTable.owner, user.userId),
          eq(fileTable.parentId, BigInt(parentId)),
        ),
      )
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
