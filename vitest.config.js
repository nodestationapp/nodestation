import "dotenv/config";
import { defineConfig } from "vitest/config";

process.env.DATABASE_FILENAME = ".db-test/data.sqlite3";

export default defineConfig({
  test: {
    globalSetup: "./setup.js",
  },
});
