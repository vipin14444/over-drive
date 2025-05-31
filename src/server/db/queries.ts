import { and, eq } from "drizzle-orm";
import { db } from ".";
import { fileTable, folderTable } from "./schema";
import type { FileModel, FolderModel } from "~/types";
import { auth } from "@clerk/nextjs/server";
import { UnauthorizedError } from "~/types/error";

export const QUERIES = {
  getFolders: async (parentId: number) => {
    const user = await auth();
    if (!user.userId) {
      throw new UnauthorizedError();
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
      throw new UnauthorizedError();
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

  getBreadcrumbs: async (folderId: number) => {
    const user = await auth();
    if (!user.userId) {
      throw new UnauthorizedError();
    }
    const breadcrumbs: FolderModel[] = [];

    let currentFolderId = folderId;
    while (currentFolderId) {
      const folder = await db
        .select()
        .from(folderTable)
        .where(
          and(
            eq(folderTable.owner, user.userId),
            eq(folderTable.id, BigInt(currentFolderId)),
          ),
        )
        .then((res) => res[0] as FolderModel);

      if (!folder) {
        break;
      }

      breadcrumbs.unshift(folder);
      currentFolderId = Number(folder.parentId);
    }

    return breadcrumbs;
  },

  getDriveExplorerData: async (parentId: number) => {
    const [folders, files, breadcrumbs] = await Promise.all([
      QUERIES.getFolders(parentId),
      QUERIES.getFiles(parentId),
      QUERIES.getBreadcrumbs(parentId),
    ]);

    return {
      folders,
      files,
      breadcrumbs,
    };
  },
};
