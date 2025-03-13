import request from "supertest";
import { expect, it, describe, beforeAll, afterAll, afterEach } from "vitest";

import { createApp, login } from "../utils/index.js";

describe(`Forms`, () => {
  let app;
  let token;

  beforeAll(async () => {
    app = await createApp();
    token = await login(app);
  });

  afterAll(async () => {
    app.close();
  });

  afterEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  it("GET /forms", async () => {
    const response = await request(app)
      .get("/admin/api/forms")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body) && response.body.length > 0).toBe(true);
  });
});
