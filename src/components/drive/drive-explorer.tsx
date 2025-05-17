"use client";

import FileRow from "~/components/drive/file-row";
import FolderRow from "~/components/drive/folder-row";
import type { FileModel, FolderModel } from "~/types";
import FloatingUpload from "./floating-upload";
import Breadcrumbs from "./breadcrumbs";
import Container from "../shared/container";

export default function DriveExplorer({
  folderId,
  breadcrumbs,
  folders,
  files,
}: {
  folders: FolderModel[];
  breadcrumbs: FolderModel[];
  files: FileModel[];
  folderId: number;
}) {
  const isEmpty = folders.length === 0 && files.length === 0;
  return (
    <Container className="space-y-4 bg-neutral-900 p-4 text-white">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
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
    </Container>
  );
}
