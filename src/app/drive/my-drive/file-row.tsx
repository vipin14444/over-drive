import { FaFile } from "react-icons/fa";
import type { FileModel } from "~/types";
import { DATE_UTILS } from "~/utils/date-utils";

export default function FileRow({ file }: { file: FileModel }) {
  const { name, updatedAt, size } = file;
  const formattedDate = DATE_UTILS.formatDate(updatedAt);
  return (
    <div className="flex items-center gap-4 p-3">
      <FaFile />
      <div className="flex-1">{name}</div>
      <div>{size}</div>
      <div>{formattedDate}</div>
    </div>
  );
}
