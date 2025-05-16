/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from "next/server";
import { MUTATIONS } from "~/server/db/mutations";
import type { InsertFolderRequest } from "~/types";

export async function POST(request: Request) {
  const requestData: InsertFolderRequest =
    (await request.json()) as InsertFolderRequest;
  // TODO: Validate requestData

  try {
    const response = await MUTATIONS.insertFolder(requestData);
    return NextResponse.json({
      message: "Data inserted successfully",
      data: response[0].insertId,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 },
    );
  }
}
