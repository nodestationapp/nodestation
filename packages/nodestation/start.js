#!/usr/bin/env node

import "dotenv/config";
import { server } from "@nstation/utils";

const start = async () => {
  try {
    const timeStart = new Date();

    await server.create();
    await server.start(timeStart);
  } catch (err) {
    console.error(err);
  }
};

export default start;
