export type DriveFileType =
  | "folder"
  | "document"
  | "presentation"
  | "image"
  | "video"
  | "audio"
  | "file";

export type FileModel = {
  id: bigint;
  parentId: bigint; // null for root folders
  name: string;
  type: DriveFileType;
  size: bigint | null; // e.g., "2.5 GB"
  createdAt: Date; // e.g., "2023-10-01"
  updatedAt: Date; // e.g., "2023-10-01"
  owner: string; // e.g., "ownerId"
  url: string; // e.g., "https://example.com/file"
};

export type FolderModel = {
  id: bigint;
  parentId: bigint; // null for root folders
  name: string;
  createdAt: Date; // e.g., "2023-10-01"
  updatedAt: Date; // e.g., "2023-10-01"
  owner: string; // e.g., "ownerId"
};

export type InsertFileModel = Omit<FileModel, "id" | "createdAt" | "updatedAt">;
export type InsertFileRequest = Omit<
  FileModel,
  "id" | "createdAt" | "updatedAt" | "parentId" | "size"
> & {
  size: number;
  parentId: number;
};
export type InsertFolderModel = Omit<
  FolderModel,
  "id" | "createdAt" | "updatedAt"
>;
export type InsertFolderRequest = Omit<
  FolderModel,
  "id" | "createdAt" | "updatedAt" | "parentId"
> & {
  parentId: number;
};
