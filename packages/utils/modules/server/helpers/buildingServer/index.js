import fs from "#modules/fs/index.js";

export default async () => {
  try {
    await fs.generateServer();
  } catch (error) {
    console.error(error);
  }
};
