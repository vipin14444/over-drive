export type FileModel = {
  id: number;
  parentId: number | null; // null for root folders
  name: string;
  type:
    | "folder"
    | "document"
    | "presentation"
    | "image"
    | "video"
    | "audio"
    | "other";
  size: string; // e.g., "2.5 GB"
  createdAt: string; // e.g., "2023-10-01"
  updatedAt: string; // e.g., "2023-10-01"
  owner: string; // e.g., "ownerId"
};

export type FolderModel = {
  id: number;
  parentId: number | null; // null for root folders
  name: string;
  createdAt: string; // e.g., "2023-10-01"
  updatedAt: string; // e.g., "2023-10-01"
  owner: string; // e.g., "ownerId"
};
