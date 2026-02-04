import crypto from "crypto";

const algorithm = "aes-256-cbc";
// 32-byte key and 16-byte IV
const secretKey = crypto
  .createHash("sha256")
  .update("L&{6Co+>tcb?tSrRL@1A[-+tZ2jksTEaALX|,WMNI(,`+wN3u.iN^gvTpm=,+c~")
  .digest("base64")
  .substring(0, 32);
const iv = crypto.randomBytes(16);

/**
 * Encrypt a string
 */
export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted; // prepend IV for later decryption
}

/**
 * Decrypt an encrypted string
 */
export function decrypt(encryptedText: string): string {
  const [ivHex, encrypted] = encryptedText.split(":");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(ivHex, "hex")
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
