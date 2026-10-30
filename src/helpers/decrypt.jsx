import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = import.meta.env.VITE_ENC_KEY;

/**
 * Decrypts a URL-encoded AES encrypted string
 * @param {string} cipherText - The encrypted, URL-encoded string
 * @returns {string|null} - The decrypted string or null if decryption fails
 */
export const decryptString = (cipherText) => {
  try {
    if (!cipherText || !ENCRYPTION_KEY) {
      return null;
    }

    // First decode URI component
    const decoded = decodeURIComponent(cipherText);

    // Decrypt using AES
    const bytes = CryptoJS.AES.decrypt(decoded, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return decrypted || null;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

/**
 * Decrypts a URL-encoded AES encrypted object
 * @param {string} cipherText - The encrypted, URL-encoded string containing JSON
 * @returns {object|null} - The decrypted object or null if decryption fails
 */
export const decryptObject = (cipherText) => {
  try {
    const decryptedString = decryptString(cipherText);
    if (!decryptedString) {
      return null;
    }

    const parsed = JSON.parse(decryptedString);
    return parsed;
  } catch (error) {
    console.error("Object decryption failed:", error);
    return null;
  }
};
