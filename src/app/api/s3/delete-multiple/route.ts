import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { files } = await req.json();

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!;

    const deleteObjects = files.map((file: any) => ({
      Key: `${file.folder}/${decodeURIComponent(file.filename)}`,
    }));

    await s3.send(new DeleteObjectsCommand({ Bucket: bucket, Delete: { Objects: deleteObjects } }));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete multiple error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
