import Link from "next/link";
import { FaFolder } from "react-icons/fa";
import type { FolderModel } from "~/types";
import { DATE_UTILS } from "~/utils/date-utils";
import BaseRow from "./base-row";

export default function FolderRow({ folder }: { folder: FolderModel }) {
  const { id, name, updatedAt } = folder;
  const formattedDate = DATE_UTILS.formatDate(updatedAt);

  return (
    <BaseRow>
      <Link
        className="flex flex-1 items-center gap-4"
        href={`/drive/my-drive/${id}`}
      >
        <FaFolder />
        <div className="flex-1">{name}</div>
      </Link>
      <div className="text-neutral-400">{`-`}</div>
      <div className="text-neutral-400">{formattedDate}</div>
    </BaseRow>
  );
}
