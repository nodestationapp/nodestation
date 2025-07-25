import crypto from "crypto";

const encrypt = (text) => {
  const cipher = crypto.createCipher("aes-256-cbc", process.env.TOKEN_SECRET);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipher(
    "aes-256-cbc",
    process.env.TOKEN_SECRET
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export { encrypt, decrypt };
