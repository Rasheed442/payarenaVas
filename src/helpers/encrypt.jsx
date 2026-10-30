import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = import.meta.env.VITE_ENC_KEY;

/**
 * Encrypts a string using AES and URL-encodes the result
 * @param {string} plainText - The plain text to encrypt
 * @returns {string|null} - The URL-encoded encrypted string or null if encryption fails
 */
export const encryptString = (plainText) => {
  try {
    if (!plainText || !ENCRYPTION_KEY) {
      return null;
    }

    // Encrypt using AES
    const encrypted = CryptoJS.AES.encrypt(plainText, ENCRYPTION_KEY).toString();

    // URL encode the encrypted string
    const urlEncoded = encodeURIComponent(encrypted);

    return urlEncoded;
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
};

/**
 * Encrypts an object by converting to JSON first, then encrypting and URL-encoding
 * @param {object} obj - The object to encrypt
 * @returns {string|null} - The URL-encoded encrypted JSON string or null if encryption fails
 */
export const encryptObject = (obj) => {
  try {
    const jsonString = JSON.stringify(obj);
    return encryptString(jsonString);
  } catch (error) {
    console.error("Object encryption failed:", error);
    return null;
  }
};
