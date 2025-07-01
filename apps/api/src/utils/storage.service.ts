import sharp from "sharp";
import { v4 as uuid } from "uuid";
import config from "../config";
import supabase from "./supabaseClient";

const IMAGE_BUCKET = config.supabase.image_bucket!;
const VIDEO_BUCKET = config.supabase.video_bucket!;
const DOC_BUCKET = config.supabase.doc_bucket!;

// Resize image to the max dimension while keeping aspect ratio
const resizeImage = async (buffer: Buffer, maxDim: number) => {
  const img = sharp(buffer);
  const metadata = await img.metadata();
  if (!metadata.width || !metadata.height) return buffer;

  if (metadata.width <= maxDim && metadata.height <= maxDim) {
    return buffer; // already within limits
  }

  const ratio = Math.min(maxDim / metadata.width, maxDim / metadata.height);
  return img
    .resize(
      Math.round(metadata.width * ratio),
      Math.round(metadata.height * ratio)
    )
    .toBuffer();
};

const getFileUrl = async (bucket: string, path: string) => {
  if (config.supabase.privateBuckets) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, 60 * 60 * 24 * 365); // 1 year
    if (error) throw new Error(error.message);
    return data.signedUrl;
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

export const uploadImageToSupabase = async (
  fileBuffer: Buffer,
  mimeType: string,
  folder: string = "images",
  maxDim = 1200
) => {
  const optimizedBuffer = await resizeImage(fileBuffer, maxDim);
  const fileName = `${folder}/${uuid()}`;
  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(fileName, optimizedBuffer, {
      cacheControl: "3600",
      contentType: mimeType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Supabase image upload failed: ${error.message}`);
  }

  return getFileUrl(IMAGE_BUCKET, fileName);
};

export const uploadVideoToSupabase = async (
  fileBuffer: Buffer,
  mimeType: string,
  folder: string = "videos"
) => {
  const fileName = `${folder}/${uuid()}`;
  const { error } = await supabase.storage
    .from(VIDEO_BUCKET!)
    .upload(fileName, fileBuffer, {
      contentType: mimeType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Supabase video upload failed: ${error.message}`);
  }

  return getFileUrl(VIDEO_BUCKET!, fileName);
};

export const uploadDocumentToSupabase = async (
  fileBuffer: Buffer,
  mimeType: string,
  folder: string = "docs"
) => {
  const fileName = `${folder}/${uuid()}`;
  const { error } = await supabase.storage
    .from(DOC_BUCKET!)
    .upload(fileName, fileBuffer, {
      contentType: mimeType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Supabase document upload failed: ${error.message}`);
  }

  return getFileUrl(DOC_BUCKET!, fileName);
};

export const uploadThumbnailImageToSupabase = async (
  fileBuffer: Buffer,
  mimeType: string,
  folder: string = "thumbnails"
) => {
  return uploadImageToSupabase(fileBuffer, mimeType, folder, 400);
};
