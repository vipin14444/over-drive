import type { DriveFileType } from "~/types";

export const FILE_UTILS = {
  // Return the file type based on the provided string which is a mime type
  getDriveFileType: (fileType: string): DriveFileType => {
    if (fileType.startsWith("image/")) {
      return "image";
    } else if (fileType.startsWith("video/")) {
      return "video";
    } else if (fileType.startsWith("audio/")) {
      return "audio";
    } else if (fileType.startsWith("application/")) {
      return "document";
    } else if (fileType.startsWith("text/")) {
      return "document";
    }
    return "file";
  },
};
