"use server";

import { verifySession } from "@/app/auth/utils";
import { deleteFile, getDownloadUrl, getThumbnailDownloadUrl, getUploadParams } from "./core";
import {
  insertFileRecords,
  deleteFileRecord,
  getFileInfo,
} from "@/db/api/file";
import { UploadedFile } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Configuration object
const uploadConfig = {
  maxSizeBytes: 500 * 1024 * 1024, // 500MB
};

export async function getS3UploadParams(
  filename: string,
  contentType: string,
  sizeBytes: number,
) {
  await verifySession();

  // Validate file size
  if (sizeBytes > uploadConfig.maxSizeBytes) {
    throw new Error(
      `File size exceeds the maximum limit of ${uploadConfig.maxSizeBytes / (1024 * 1024)}MB`,
    );
  }

  // If validation passes, proceed with getting upload params
  const response = await getUploadParams({ filename, contentType });

  return response;
}

export async function getS3DownloadUrl(key: string) {
  await verifySession();

  const { url } = await getDownloadUrl(key);

  return url;
}

export async function getS3ThumbnailDownloadUrl(key: string) {
  await verifySession();

  const { url } = await getThumbnailDownloadUrl(key);

  return url;
}

export async function deleteFileFromS3(key: string) {
  await verifySession();

  const { success } = await deleteFile(key);

  return { success };
}

export async function getFilesFromDB(page: number, pageSize: number, selectedFileTypes: string[], fileName?: string) {
  const { userId } = await verifySession();

  return getFileInfo(userId, page, pageSize, selectedFileTypes, fileName);
}

export async function uploadFilesToDB(files: UploadedFile[]) {
  const { userId } = await verifySession();

  try {
    await insertFileRecords(userId, files);

    // Wait for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Revalidate the dashboard page after successful upload
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error uploading files:", error);
    return { success: false };
  }
}

export async function deleteFileFromDB(fileKey: string) {
  const { userId } = await verifySession();

  try {
    // Delete the file record from the database
    await deleteFileRecord(userId, fileKey);
    // Revalidate the dashboard page after successful deletion
    revalidatePath("/dashboard");

    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, message: "Failed to delete file" };
  }
}
