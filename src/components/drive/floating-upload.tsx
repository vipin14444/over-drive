"use client";

import { useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import { useFileUpload } from "~/hooks/useFileUpload";
import { DriveService } from "~/services/drive-service";
import type { InsertFileRequest, InsertFolderRequest } from "~/types";
import { FILE_UTILS } from "~/utils/file-utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FiPlus } from "react-icons/fi";
import { FaFile, FaFolder } from "react-icons/fa";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function FloatingUpload({ folderId }: { folderId: number }) {
  const { userId } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"none" | "file" | "folder">("none");
  const [folderName, setFolderName] = useState("");

  const onUploadComplete = async (url: string, file: File) => {
    console.log("File available at", url);

    if (!userId) {
      throw new Error("User ID is not available");
    }

    if (!url) {
      throw new Error("File URL is not available");
    }

    const fileModel: InsertFileRequest = {
      parentId: folderId,
      name: file.name,
      type: FILE_UTILS.getDriveFileType(file.type),
      size: file.size,
      owner: userId,
      url: url,
    };
    const createFileResponse = await DriveService.createFile(fileModel);

    if (createFileResponse.status !== 200) {
      console.error("Error creating file:", createFileResponse.data);
      throw new Error("Failed to create file.");
    }

    const responseData = createFileResponse.data.data;
    console.log("File created successfully:", responseData);
    router.refresh();
  };

  const { uploadProgress, downloadURL, startUpload, uploaded } = useFileUpload({
    onUploadComplete: (url, file) => {
      onUploadComplete(url, file).catch((error) => {
        console.error("Error in onUploadComplete:", error);
      });
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
    },
  });

  const onBackPress = () => {
    setMode("none");
  };

  const onClickCreateFolder = async (folderName: string) => {
    try {
      if (!userId) {
        throw new Error("User ID is not available");
      }

      const folderModel: InsertFolderRequest = {
        parentId: folderId,
        name: folderName,
        owner: userId,
      };

      const createFolderResponse = await DriveService.createFolder(folderModel);
      if (createFolderResponse.status !== 200) {
        console.error("Error creating folder:", createFolderResponse.data);
        throw new Error("Failed to create folder.");
      }

      const insertedFolderId = createFolderResponse.data.data;
      console.log("Folder created successfully:", insertedFolderId);
      router.push(`/drive/my-drive/${insertedFolderId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="fixed right-4 bottom-4">
        <div className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-700 p-4 shadow-lg transition-all duration-300 hover:bg-neutral-600">
          <FiPlus />
          New
        </div>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        className="mr-4 flex flex-col rounded-xl border-none bg-neutral-700 p-1.5 text-white"
      >
        {mode === "folder" ? (
          <div className="flex flex-col p-2">
            <button
              onClick={onBackPress}
              className="mb-4 flex w-fit cursor-pointer items-center gap-1 rounded-lg bg-neutral-600 p-1.5 text-xs hover:ring-1 hover:ring-neutral-500"
            >
              <IoMdArrowRoundBack className="text-base" />
              Back
            </button>
            <h2 className="font-bold">Create Folder</h2>
            <p className="text-sm text-neutral-400">
              Enter name of your new folder.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <input
                value={folderName}
                onChange={(e) => {
                  setFolderName(e.target.value);
                }}
                className="rounded-lg border border-neutral-600 bg-neutral-800 p-2 text-white"
                type="text"
              />
              <button
                onClick={async () => {
                  await onClickCreateFolder(folderName);
                }}
                className="flex size-[42px] shrink-0 items-center justify-center self-stretch rounded-lg bg-neutral-600 p-2 hover:bg-neutral-500"
              >
                <IoMdArrowRoundForward />
              </button>
            </div>
          </div>
        ) : mode === "file" ? (
          <div className="flex flex-col p-2">
            <button
              onClick={onBackPress}
              className="mb-4 flex w-fit cursor-pointer items-center gap-1 rounded-lg bg-neutral-600 p-1.5 text-xs hover:ring-1 hover:ring-neutral-500"
            >
              <IoMdArrowRoundBack className="text-base" />
              Back
            </button>
            <h2 className="font-bold">Upload File</h2>
            <p className="text-sm text-neutral-400">
              Upload files to your Firebase storage.
            </p>
            <input
              className="mt-4 rounded-lg border border-neutral-600 bg-neutral-800 p-2 text-white"
              id="fileUpload"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  startUpload(file);
                }
              }}
            />
            {uploadProgress > 0 && (
              <div>
                <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>
                {uploaded && <p>File uploaded successfully!</p>}
              </div>
            )}
            {downloadURL && (
              <div>
                <a href={downloadURL} target="_blank" rel="noopener noreferrer">
                  Download File
                </a>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setMode("file");
              }}
              className="flex min-h-10 w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-neutral-600"
            >
              <FaFile /> File
            </button>
            <button
              onClick={() => {
                setMode("folder");
              }}
              className="flex min-h-10 w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-neutral-600"
            >
              <FaFolder />
              Folder
            </button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
