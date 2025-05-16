import type {
  InsertFileModel,
  InsertFileRequest,
  InsertFolderModel,
  InsertFolderRequest,
} from "~/types";
import { db } from ".";
import { fileTable, folderTable } from "./schema";

export const MUTATIONS = {
  insertMockData: async () => {
    const folders: InsertFolderModel[] = [
      {
        parentId: BigInt(0),
        name: "My Drive",
        owner: "",
      },
      {
        parentId: BigInt(0),
        name: "Shared with me",
        owner: "",
      },
      {
        parentId: BigInt(0),
        name: "Recent files",
        owner: "",
      },
      {
        parentId: BigInt(0),
        name: "Starred files",
        owner: "",
      },
    ];

    const files: InsertFileModel[] = [
      {
        parentId: BigInt(0),
        name: "Document 1",
        type: "document",
        size: BigInt(1024 * 1024), // 1 MB
        owner: "",
        url: "1",
      },
      {
        parentId: BigInt(0),
        name: "Image 1",
        type: "image",
        size: BigInt(1024 * 1024), // 1 MB
        owner: "",
        url: "1",
      },
      {
        parentId: BigInt(0),
        name: "Video 1",
        type: "video",
        size: BigInt(1024 * 1024), // 1 MB
        owner: "",
        url: "1",
      },
      {
        parentId: BigInt(0),
        name: "Audio 1",
        type: "audio",
        size: BigInt(1024 * 1024), // 1 MB
        owner: "",
        url: "1",
      },
      {
        parentId: BigInt(0),
        name: "Presentation 1",
        type: "presentation",
        size: BigInt(1024 * 1024), // 1 MB
        owner: "",
        url: "1",
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

  insertFile: async (file: InsertFileRequest) => {
    const insertFileModel: InsertFileModel = {
      ...file,
      parentId: BigInt(file.parentId),
      size: BigInt(file.size),
    };
    const response = await db.insert(fileTable).values(insertFileModel);
    console.log("Inserted file:", response);
    return response;
  },

  insertFolder: async (folder: InsertFolderRequest) => {
    const insertFolderModel: InsertFolderModel = {
      ...folder,
      parentId: BigInt(folder.parentId),
    };
    const response = await db.insert(folderTable).values(insertFolderModel);
    console.log("Inserted folder:", response);
    return response;
  },
};
