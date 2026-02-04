import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = process.env.NEXT_PUBLIC_AWS_REGION || "ap-southeast-1"; // fallback for safety

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder");
    const filename = searchParams.get("filename");

    if (!folder || !filename)
      return NextResponse.json({ error: "Missing folder or filename" }, { status: 400 });

    const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!;
    const safeName = encodeURIComponent(filename).replace(/%20/g, "_");
    const key = `${folder}/${Date.now()}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: "application/octet-stream",
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    const fileUrl = `https://${bucket}.s3.${REGION}.amazonaws.com/${key}`;

    return NextResponse.json({ uploadUrl, fileUrl });
  } catch (error: any) {
    console.error("Presign error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
