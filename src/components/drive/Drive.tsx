import FileRow from "~/app/drive/my-drive/file-row";
import FolderRow from "~/app/drive/my-drive/folder-row";
import { MUTATIONS } from "~/server/db/mutations";
import type { FileModel, FolderModel } from "~/types";

export default function DriveExplorer({
  folders,
  files,
}: {
  folders: FolderModel[];
  files: FileModel[];
}) {
  return (
    <main className="min-h-screen bg-neutral-900 p-4 text-white">
      <section className="divide-y divide-[rgba(255,255,255,0.2)] rounded-2xl bg-neutral-950 p-4 text-gray-200">
        {folders.map((folder) => (
          <FolderRow key={folder.id} folder={folder} />
        ))}
        {files.map((file) => (
          <FileRow key={file.id} file={file} />
        ))}
      </section>
      <section className="divide-y divide-[rgba(255,255,255,0.2)] rounded-2xl bg-neutral-950 p-4 text-gray-200">
        <form
          action={async () => {
            "use server";
            const response = await MUTATIONS.insertMockData();
            console.log("Response:", response);
          }}
        >
          <button type="submit">Insert Mock Data</button>
        </form>
      </section>
    </main>
  );
}
