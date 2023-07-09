import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
});

async function uploadImageToS3(
  file: Buffer,
  fileName: string
): Promise<string> {
  const resizedImageBuffer = await sharp(file)
    .resize(640, 427) // Specify your desired width or height for resizing
    .toBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${fileName}`,
    Body: resizedImageBuffer,
    ContentType: "image/jpeg", // Change the content type accordingly
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const mimeType = file.type;
    const fileExtension = mimeType.split("/")[1];

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadImageToS3(
      buffer,
      uuid() + "." + fileExtension
    );

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}
