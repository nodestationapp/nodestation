#!/usr/bin/env node

import "dotenv/config";
import { server } from "@nstation/utils";

const entry = async (type) => {
  try {
    const timeStart = new Date();

    if (type === "dev") {
      await server.create();
    }
    await server.start(timeStart, type);
  } catch (err) {
    console.error(err);
  }
};

export default entry;
