import { FaFolder } from "react-icons/fa";
import type { FolderModel } from "~/types";
import { DATE_UTILS } from "~/utils/date-utils";

export default function FolderRow({ folder }: { folder: FolderModel }) {
  const { id, name, updatedAt } = folder;
  const formattedDate = DATE_UTILS.formatDate(updatedAt);
  return (
    <div className="flex items-center gap-4 p-3">
      <FaFolder />
      <div className="flex-1">{name}</div>
      <div>{`-`}</div>
      <div>{formattedDate}</div>
    </div>
  );
}
