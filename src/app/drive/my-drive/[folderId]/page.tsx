import { QUERIES } from "~/server/db/queries";
import DriveExplorer from "~/components/drive/Drive";

export default async function MyDrivePage({
  params: { folderId },
}: {
  params: { folderId: string };
}) {
  const { folders, files } = await QUERIES.getDriveExplorerData(
    parseInt(folderId),
  );
  console.log("Folders:", folders);
  console.log("Files:", files);

  return <DriveExplorer folders={folders} files={files} />;
}
