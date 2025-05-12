import type { FileModel, FolderModel } from "~/types";
import FolderRow from "./folder-row";
import FileRow from "./file-row";

export default function MyDrivePage() {
  const folders: FolderModel[] = [
    {
      id: 1,
      parentId: null,
      name: "My Drive",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-01",
      owner: "ownerId",
    },
    {
      id: 2,
      parentId: null,
      name: "Shared with me",
      createdAt: "2023-10-02",
      updatedAt: "2023-10-02",
      owner: "ownerId",
    },
    {
      id: 3,
      parentId: null,
      name: "Recent files",
      createdAt: "2023-10-03",
      updatedAt: "2023-10-03",
      owner: "ownerId",
    },
    {
      id: 4,
      parentId: null,
      name: "Starred files",
      createdAt: "2023-10-04",
      updatedAt: "2023-10-04",
      owner: "ownerId",
    },
  ];

  const files: FileModel[] = [
    {
      id: 1,
      parentId: null,
      name: "Document 1",
      type: "document",
      size: "1 MB",
      createdAt: "2023-10-05",
      updatedAt: "2023-10-05",
      owner: "ownerId",
    },
    {
      id: 2,
      parentId: null,
      name: "Image 1",
      type: "image",
      size: "2 MB",
      createdAt: "2023-10-06",
      updatedAt: "2023-10-06",
      owner: "ownerId",
    },
    {
      id: 3,
      parentId: null,
      name: "Video 1",
      type: "video",
      size: "10 MB",
      createdAt: "2023-10-07",
      updatedAt: "2023-10-07",
      owner: "ownerId",
    },
    {
      id: 4,
      parentId: null,
      name: "Audio 1",
      type: "audio",
      size: "5 MB",
      createdAt: "2023-10-08",
      updatedAt: "2023-10-08",
      owner: "ownerId",
    },
    {
      id: 5,
      parentId: null,
      name: "Presentation 1",
      type: "presentation",
      size: "3 MB",
      createdAt: "2023-10-09",
      updatedAt: "2023-10-09",
      owner: "ownerId",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-900 p-4 text-white">
      <section className="rounded-2xl bg-neutral-950 p-4 text-gray-200 divide-y divide-[rgba(255,255,255,0.2)]">
        {folders.map((folder) => (
          <FolderRow key={folder.id} folder={folder} />
        ))}
        {files.map((file) => (
          <FileRow key={file.id} file={file} />
        ))}
      </section>
    </main>
  );
}
