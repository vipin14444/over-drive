import { FaFile } from "react-icons/fa";
import type { FileModel } from "~/types";
import { DATE_UTILS } from "~/utils/date-utils";
import { FORMAT_UTILS } from "~/utils/format-utils";
import BaseRow from "./base-row";

export default function FileRow({ file }: { file: FileModel }) {
  const { name, updatedAt, size, url } = file;
  const formattedDate = DATE_UTILS.formatDate(updatedAt);
  return (
    <BaseRow>
      <a target="_blank" className="flex flex-1 items-center gap-4" href={url}>
        <FaFile />
        <div className="flex-1">{name}</div>
      </a>
      <div className="text-neutral-400">
        {FORMAT_UTILS.formatBytes(parseInt(size?.toString() ?? "0"))}
      </div>
      <div className="text-neutral-400">{formattedDate}</div>
    </BaseRow>
  );
}
