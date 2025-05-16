import { QUERIES } from "~/server/db/queries";
import DriveExplorer from "~/components/drive/Drive";

export default async function MyDrivePage() {
  const FOLDER_ID = 0;
  const { folders, files } = await QUERIES.getDriveExplorerData(FOLDER_ID);
  console.log("Folders:", folders);
  console.log("Files:", files);

  return <DriveExplorer folders={folders} files={files} folderId={FOLDER_ID} />;
}
