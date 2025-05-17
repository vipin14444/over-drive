import { QUERIES } from "~/server/db/queries";
import DriveExplorer from "~/components/drive/drive-explorer";

export default async function MyDrivePage() {
  const FOLDER_ID = 0;
  const { folders, files, breadcrumbs } =
    await QUERIES.getDriveExplorerData(FOLDER_ID);

  return (
    <DriveExplorer
      folders={folders}
      breadcrumbs={breadcrumbs}
      files={files}
      folderId={FOLDER_ID}
    />
  );
}
