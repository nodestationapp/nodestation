import "dotenv/config";
import { defineConfig } from "vitest/config";

if (process.env.DATABASE_CLIENT === "sqlite") {
  process.env.NODE_ENV = "test";
  process.env.DATABASE_PATH = ".db-test/data.sqlite3";
}

export default defineConfig({
  test: {
    globalSetup: "./tests/setup.js",
  },
});
