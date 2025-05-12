import { FaFile } from "react-icons/fa";
import type { FileModel } from "~/types";

export default function FileRow({ file }: { file: FileModel }) {
  const { id, name, updatedAt } = file;
  return (
    <div className="flex items-center gap-4 p-3">
      <FaFile />
      <div className="flex-1">{name}</div>
      <div>{updatedAt}</div>
    </div>
  );
}
