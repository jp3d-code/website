import type { Payload } from "payload";

export const imageBaseUrl = "https://jp3doficial.com/";

export async function uploadMediaFromUrl(
  payload: Payload,
  urlPath: string,
  alt: string,
): Promise<number | undefined> {
  const fullUrl = `${imageBaseUrl}${urlPath}`;
  const filename = urlPath.split("/").pop() || "image.png";

  return uploadMedia(payload, fullUrl, filename, alt);
}

export async function uploadMediaFromExternalUrl(
  payload: Payload,
  fullUrl: string,
  alt: string,
): Promise<number | undefined> {
  const filename = fullUrl.split("/").pop() || "image.png";
  return uploadMedia(payload, fullUrl, filename, alt);
}

async function uploadMedia(
  payload: Payload,
  fullUrl: string,
  filename: string,
  alt: string,
): Promise<number | undefined> {
  try {
    // Check if media already exists
    const existingMedia = await payload.find({
      collection: "media",
      where: {
        alt: {
          equals: alt,
        },
      },
      limit: 1,
    });

    if (existingMedia.totalDocs > 0) {
      return existingMedia.docs[0].id;
    }

    payload.logger.info(`Downloading image: ${fullUrl}`);
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const media = await payload.create({
      collection: "media",
      data: {
        alt,
      },
      file: {
        data: buffer,
        name: filename,
        mimetype: response.headers.get("content-type") || "image/png",
        size: buffer.length,
      },
      overrideAccess: true,
    });

    return media.id;
  } catch (error) {
    payload.logger.error(`Error uploading media from ${fullUrl}: ${error}`);
    return undefined;
  }
}
