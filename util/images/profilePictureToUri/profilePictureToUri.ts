// The current-user endpoint returns the profile picture as raw image bytes
// serialized to JSON. Depending on how the backend serializes its buffer this
// arrives either as `{ "0": n, "1": n, ... }` (a buffer spread into an object)
// or `{ type: "Buffer", data: [n, n, ...] }` (Node's `Buffer#toJSON`). Byte
// values may themselves be numbers or numeric strings. This helper normalizes
// any of those shapes into a renderable `data:` URI, sniffing the image type
// from the magic number since the payload carries no MIME type. Returns
// `undefined` when there is no picture so callers can fall back to initials.

const BASE64_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const encodeBase64 = (bytes: number[]): string => {
  let output = "";

  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i] & 0xff;
    const b1 = i + 1 < bytes.length ? bytes[i + 1] & 0xff : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] & 0xff : 0;

    output += BASE64_CHARS[b0 >> 2];
    output += BASE64_CHARS[((b0 & 0x03) << 4) | (b1 >> 4)];
    output +=
      i + 1 < bytes.length
        ? BASE64_CHARS[((b1 & 0x0f) << 2) | (b2 >> 6)]
        : "=";
    output += i + 2 < bytes.length ? BASE64_CHARS[b2 & 0x3f] : "=";
  }

  return output;
};

const sniffMimeType = (bytes: number[]): string => {
  const [b0, b1, b2, b3] = bytes;

  if (b0 === 0x89 && b1 === 0x50) return "image/png";
  if (b0 === 0x47 && b1 === 0x49) return "image/gif";
  if (b0 === 0x52 && b1 === 0x49 && b2 === 0x46 && b3 === 0x46) {
    return "image/webp";
  }

  // JPEG (0xFF 0xD8) and anything unrecognized: default to JPEG, which RN's
  // Image decoder will re-sniff from the bytes regardless.
  return "image/jpeg";
};

export const profilePictureToUri = (
  picture:
    | Record<string, number | string>
    | { data: number[] }
    | string
    | null
    | undefined,
): string | undefined => {
  if (!picture) return undefined;

  // Already a URL or data URI — pass through unchanged.
  if (typeof picture === "string") {
    return picture.length > 0 ? picture : undefined;
  }

  let bytes: number[];

  if (Array.isArray((picture as { data?: number[] }).data)) {
    bytes = (picture as { data: number[] }).data.map(Number);
  } else {
    // Numeric-keyed object — order by key, since object iteration order isn't
    // guaranteed for the integer-like keys across engines.
    bytes = Object.keys(picture)
      .map(Number)
      .filter((key) => !Number.isNaN(key))
      .sort((a, b) => a - b)
      .map((key) => Number((picture as Record<string, number | string>)[key]));
  }

  if (bytes.length === 0) return undefined;

  return `data:${sniffMimeType(bytes)};base64,${encodeBase64(bytes)}`;
};
