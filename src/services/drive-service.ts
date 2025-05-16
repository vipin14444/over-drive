import axios from "axios";
import type { InsertFileRequest, InsertFolderRequest } from "~/types";

export const DriveService = {
  createFile: async (fileModel: InsertFileRequest) => {
    return await axios.post<{ message: string; data: unknown }>(
      "/api/drive/add-file",
      fileModel,
    );
  },
  createFolder: async (folderModel: InsertFolderRequest) => {
    return await axios.post<{ message: string; data: number }>(
      "/api/drive/add-folder",
      folderModel,
    );
  },
};
