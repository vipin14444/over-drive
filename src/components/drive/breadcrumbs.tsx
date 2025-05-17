import React, { Fragment } from "react";
import type { FolderModel } from "~/types";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: FolderModel[];
}) {
  const lastTwoFolders = breadcrumbs.slice(-2);
  const remainingFolders = breadcrumbs.slice(0, -2);
  console.log({ breadcrumbs, lastTwoFolders, remainingFolders });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="hover:text-white hover:underline" href="/drive/my-drive">
            My Drive
          </BreadcrumbLink>
        </BreadcrumbItem>

        {remainingFolders.length > 0 && (
          <Fragment>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="rounded-xl border-none bg-neutral-700 p-1.5 text-white"
                  align="start"
                >
                  {remainingFolders.map((folder) => (
                    <DropdownMenuItem
                      className="rounded-lg p-0 hover:!bg-neutral-600"
                      key={folder.id}
                    >
                      <BreadcrumbLink
                        className="px-4 py-2 hover:text-white hover:underline"
                        href={`/drive/my-drive/${folder.id}`}
                      >
                        {folder.name}
                      </BreadcrumbLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </Fragment>
        )}

        {lastTwoFolders.map((folder) => (
          <Fragment key={folder.id}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:text-white hover:underline"
                href={`/drive/my-drive/${folder.id}`}
              >
                {folder.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
