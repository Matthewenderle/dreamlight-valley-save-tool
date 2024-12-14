import CryptoJS from 'crypto-js';
import JSZip from 'jszip';

interface HexToWordArray {
  (hexKey: string): CryptoJS.lib.WordArray;
}

interface WordArray {
  words: number[];
  sigBytes: number;
}

export const useSaveTool = () => {
  const decryptionKey = useRuntimeConfig().public.decryptionKey;

  const hexToWordArray: HexToWordArray = (hexKey: string): CryptoJS.lib.WordArray => {
    return CryptoJS.enc.Hex.parse(hexKey);
  };

  const wordArrayToUint8Array = (wordArray: WordArray): Uint8Array => {
    const words = wordArray.words;
    const sigBytes = wordArray.sigBytes;

    const uint8Array = new Uint8Array(sigBytes);
    for (let i = 0; i < sigBytes; i++) {
      uint8Array[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return uint8Array;
  };

  /**
   * Decrypts the encrypted data using AES in ECB mode with no padding.
   * @param {string} encryptedData - The encrypted data as a base64 string.
   * @param {string} decryptionKeyHex - The decryption key as a hexadecimal string.
   * @returns {Promise<string>} The decrypted and unzipped content.
   */
  const decryptSave = async (encryptedData: string, decryptionKeyHex = decryptionKey) => {
    try {
      const key = hexToWordArray(decryptionKeyHex);
      const iv = CryptoJS.enc.Hex.parse('0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ');
      const mode = CryptoJS.mode.ECB;
      const padding = CryptoJS.pad.NoPadding;
      const outputType = CryptoJS.enc.Utf8;

      const cipherText = CryptoJS.enc.Base64.parse(encryptedData);

      const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: cipherText });
      const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
        mode,
        padding,
        iv,
        outputType,
      });

      const decryptedUint8Array = wordArrayToUint8Array(decrypted);

      const zip = new JSZip();
      const unzipped = await zip.loadAsync(decryptedUint8Array);

      const fileNames = Object.keys(unzipped.files);
      if (fileNames.length === 0) {
        throw new Error('No files found in the unzipped content.');
      }

      const file = unzipped.file(fileNames[0]);
      if (!file) {
        throw new Error('File not found in the unzipped content.');
      }
      const extractedFileContent = await file.async('string');
      return extractedFileContent;
    } catch (error) {
      console.error('Decryption and unzipping failed:', error);
      throw error;
    }
  };

  return {
    decryptSave,
  };
};
