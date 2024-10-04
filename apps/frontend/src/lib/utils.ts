import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts an image URL to a File object.
 *
 * This function fetches the image as a Blob, extracts the image extension, and then converts the Blob to a File.
 * The File object can be useful when sending the image to a backend that expects a File.
 *
 * @param imageUrl - The URL of the image to convert.
 * @returns A Promise that resolves to the converted File object.
 * If an error occurs during the conversion process, the Promise will be rejected with the error.
 */
export async function convertImageUrlToFileObject(
  imageUrl: string
): Promise<File | null> {
  try {
    // Step 1: Fetch the image as a Blob
    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' },
    });

    if (!response.ok) {
      console.error('Error fetching image: ', response);
      return null;
    }

    const blob = await response.blob();

    // Step 2: Getting the image extension
    const extension = imageUrl.split('.').pop();

    // Step 3: Convert the Blob to a File (optional, but useful if the backend expects a File)
    const file = new File([blob], `image.${extension}`, { type: blob.type });

    return file;
  } catch (error) {
    console.error('Error Converting the image to file:', error);
    throw error;
  }
}
