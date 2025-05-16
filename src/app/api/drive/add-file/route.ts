import { NextResponse } from "next/server";
import { MUTATIONS } from "~/server/db/mutations";
import type { InsertFileRequest } from "~/types";

export async function POST(request: Request) {
  const requestData: InsertFileRequest =
    (await request.json()) as InsertFileRequest;
  // TODO: Validate requestData

  try {
    const response = await MUTATIONS.insertFile(requestData);

    return NextResponse.json({
      message: "Data inserted successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 },
    );
  }
}
