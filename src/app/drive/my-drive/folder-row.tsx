import { FaFolder } from "react-icons/fa";
import type { FolderModel } from "~/types";

export default function FolderRow({ folder }: { folder: FolderModel }) {
  const { id, name, updatedAt } = folder;
  return (
    <div className="flex items-center gap-4 p-3">
      <FaFolder />
      <div className="flex-1">{name}</div>
      <div>{updatedAt}</div>
    </div>
  );
}
