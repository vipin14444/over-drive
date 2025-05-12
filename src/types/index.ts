export type FileModel = {
  id: bigint;
  parentId: bigint; // null for root folders
  name: string;
  type:
    | "folder"
    | "document"
    | "presentation"
    | "image"
    | "video"
    | "audio"
    | "file";
  size: bigint | null; // e.g., "2.5 GB"
  createdAt: Date; // e.g., "2023-10-01"
  updatedAt: Date; // e.g., "2023-10-01"
  owner: bigint; // e.g., "ownerId"
};

export type FolderModel = {
  id: bigint;
  parentId: bigint; // null for root folders
  name: string;
  createdAt: Date; // e.g., "2023-10-01"
  updatedAt: Date; // e.g., "2023-10-01"
  owner: bigint; // e.g., "ownerId"
};

export type InsertFileModel = Omit<FileModel, "id" | "createdAt" | "updatedAt">;
export type InsertFolderModel = Omit<FolderModel, "id" | "createdAt" | "updatedAt">;
