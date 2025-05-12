import type { InsertFileModel, InsertFolderModel } from "~/types";
import { db } from ".";
import { fileTable, folderTable } from "./schema";

export const MUTATIONS = {
  insertMockData: async () => {
    const folders: InsertFolderModel[] = [
      {
        parentId: BigInt(0),
        name: "My Drive",
        owner: BigInt(0),
      },
      {
        parentId: BigInt(0),
        name: "Shared with me",
        owner: BigInt(0),
      },
      {
        parentId: BigInt(0),
        name: "Recent files",
        owner: BigInt(0),
      },
      {
        parentId: BigInt(0),
        name: "Starred files",
        owner: BigInt(0),
      },
    ];

    const files: InsertFileModel[] = [
      {
        parentId: BigInt(0),
        name: "Document 1",
        type: "document",
        size: BigInt(1024 * 1024), // 1 MB
        owner: BigInt(0),
      },
      {
        parentId: BigInt(0),
        name: "Image 1",
        type: "image",
        size: BigInt(1024 * 1024), // 1 MB
        owner: BigInt(0),
      },
      {
        parentId: BigInt(0),
        name: "Video 1",
        type: "video",
        size: BigInt(1024 * 1024), // 1 MB
        owner: BigInt(0),
      },
      {
        parentId: BigInt(0),
        name: "Audio 1",
        type: "audio",
        size: BigInt(1024 * 1024), // 1 MB
        owner: BigInt(0),
      },
      {
        parentId: BigInt(0),
        name: "Presentation 1",
        type: "presentation",
        size: BigInt(1024 * 1024), // 1 MB
        owner: BigInt(0),
      },
    ];

    const foldersResponse = await db.insert(folderTable).values(folders);
    const filesResponse = await db.insert(fileTable).values(files);

    console.log("Inserted folders:", foldersResponse);
    console.log("Inserted files:", filesResponse);

    return {
      folders: foldersResponse,
      files: filesResponse,
    };
  },
};
