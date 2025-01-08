import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs/promises";
import path from "path";
import { File } from "@/models/file";

// Environment variables
const STORAGE_TYPE = process.env.STORAGE_TYPE || "local";
const S3_BUCKET = process.env.S3_BUCKET || "my-bucket";
const S3_ENDPOINT = process.env.S3_ENDPOINT || "https://s3.amazonaws.com";
const S3_REGION = process.env.S3_REGION || "us-east-1";
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY || "";
const S3_SECRET_KEY = process.env.S3_SECRET_KEY || "";
const LOCAL_STORAGE_PATH = process.env.LOCAL_STORAGE_PATH || "public/media";

// S3 client setup
const s3Client = new S3Client({
  endpoint: S3_ENDPOINT,
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
  forcePathStyle: true, // Needed for MinIO
});

export async function uploadFile(
  file: Buffer,
  originalName: string,
  mimeType: string,
  userId?: string
): Promise<{ url: string; file_id: string }> {
  const filename = `${Date.now()}-${originalName}`;
  let url: string;

  if (STORAGE_TYPE === "s3") {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: filename,
        Body: file,
        ContentType: mimeType,
      })
    );
    url = `${S3_ENDPOINT}/${S3_BUCKET}/${filename}`;
  } else {
    // await fs.mkdir(LOCAL_STORAGE_PATH, { recursive: false });
    const finalpath = path.join(LOCAL_STORAGE_PATH, filename);
    await fs.writeFile(finalpath, file as any);
    url = finalpath;
  }

  // Save file metadata to database
  const mediaFile = new File({
    filename,
    originalName,
    mimeType,
    size: file.length,
    url,
    user: userId,
  });
  await mediaFile.save();

  // If productId is provided, add the media file to the product

  return { url, file_id: mediaFile._id.toString() };
}

export async function getFileUrl(filename: string): Promise<string> {
  const mediaFile = await File.findOne({ filename });
  if (!mediaFile) {
    throw new Error("File not found");
  }

  if (STORAGE_TYPE === "s3") {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: filename,
    });
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } else {
    return mediaFile.url;
  }
}

export async function deleteFile(filename: string): Promise<void> {
  const mediaFile = await File.findOne({ filename });
  if (!mediaFile) {
    throw new Error("File not found");
  }

  if (STORAGE_TYPE === "s3") {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: S3_BUCKET,
        Key: filename,
      })
    );
  } else {
    await fs.unlink(path.join(LOCAL_STORAGE_PATH, filename));
  }

  // Remove file metadata from database
  await File.deleteOne({ filename });
}

export async function listFiles(): Promise<any[]> {
  return File.find().sort({ createdAt: -1 }).populate("product");
}

// export async function createProduct(
//   name: string,
//   description: string,
//   price: number
// ): Promise<any> {
//   const product = new Product({ name, description, price });
//   await product.save();
//   return product;
// }

// export async function getProducts(): Promise<any[]> {
//   return Product.find().sort({ createdAt: -1 }).populate("mediaFiles");
// }

// export async function deleteProduct(productId: string): Promise<void> {
//   const product = await Product.findById(productId);
//   if (!product) {
//     throw new Error("Product not found");
//   }

//   // Delete associated media files
//   for (const mediaFileId of product.mediaFiles) {
//     const mediaFile = await MediaFile.findById(mediaFileId);
//     if (mediaFile) {
//       await deleteFile(mediaFile.filename);
//     }
//   }

//   // Delete the product
//   await Product.deleteOne({ _id: productId });
// }
