"use client";

import FileRow from "~/app/drive/my-drive/file-row";
import FolderRow from "~/app/drive/my-drive/folder-row";
import type { FileModel, FolderModel } from "~/types";
import FloatingUpload from "./FloatingUpload";

export default function DriveExplorer({
  folderId,
  folders,
  files,
}: {
  folders: FolderModel[];
  files: FileModel[];
  folderId: number;
}) {
  const isEmpty = folders.length === 0 && files.length === 0;
  return (
    <main className="min-h-screen space-y-4 bg-neutral-900 p-4 text-white">
      <section className="divide-y divide-[rgba(255,255,255,0.2)] rounded-2xl bg-neutral-950 p-4 text-gray-200">
        {isEmpty && (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No files or folders found.</p>
          </div>
        )}
        {folders.map((folder) => (
          <FolderRow key={folder.id} folder={folder} />
        ))}
        {files.map((file) => (
          <FileRow key={file.id} file={file} />
        ))}
      </section>

      <FloatingUpload folderId={folderId} />
    </main>
  );
}
