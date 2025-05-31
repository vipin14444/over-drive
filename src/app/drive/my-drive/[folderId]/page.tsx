import { QUERIES } from "~/server/db/queries";
import DriveExplorer from "~/components/drive/drive-explorer";
import { UnauthorizedError } from "~/types/error";
import { redirect } from "next/navigation";

export default async function MyDrivePage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  try {
    const { folderId } = await params;
    const FOLDER_ID = parseInt(folderId);

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
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      redirect("/");
    }

    throw err;
  }
}
