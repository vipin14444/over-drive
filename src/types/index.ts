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
  parentId: bigint;
  name: string;
  type: DriveFileType;
  size: bigint | null;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
  url: string;
};

export type FolderModel = {
  id: bigint;
  parentId: bigint;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
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
