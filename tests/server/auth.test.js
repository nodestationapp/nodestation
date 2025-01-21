import path from "path";
import request from "supertest";
import { expect, it, describe, beforeAll, afterAll } from "vitest";

import { createApp, login } from "../utils/index.js";

const user = {
  first_name: "Nodestation edit",
  last_name: "Test edit edit",
  email: "test@nodestation.app",
  password: "qwerty12345",
};

describe(`Authentication`, () => {
  let app;
  let token;

  beforeAll(async () => {
    app = await createApp();
    token = await login(app);
  });

  afterAll(async () => {
    app.close();
  });

  it("GET /user/me", async () => {
    const response = await request(app)
      .get("/admin/api/user/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      logs_count: expect.any(Number),
      forms_count: expect.any(Number),
      project_name: expect.any(String),
      user: {
        photo: null,
        type: "admin",
        status: "active",
        email: expect.any(String),
        id: expect.any(String),
        last_name: expect.any(String),
        first_name: expect.any(String),
        password: expect.any(String),
        created_at: expect.any(Number),
      },
    });
  });

  it("GET /user/check-admin - if exist", async () => {
    const response = await request(app).get("/admin/api/user/check-admin");

    expect(response.status).toBe(200);
    expect(response.body.is_admin).toBe(true);
  });

  it("PUT /user/me", async () => {
    const filePath = path.join(
      process.cwd(),
      "tests",
      "server",
      "assets",
      "example-image.png"
    );

    const response = await request(app)
      .put(`/admin/api/user/me`)
      .set("Authorization", `Bearer ${token}`)
      .field("first_name", `${user.first_name} edit`)
      .field("last_name", `${user.last_name} edit`)
      .attach("photo", filePath);

    const response2 = await request(app)
      .get("/admin/api/user/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "ok",
    });

    expect(response2.status).toBe(200);
    expect(
      response2.body.user.first_name === `${user.first_name} edit` &&
        response2.body.user.last_name === `${user.last_name} edit`
    ).toBe(true);
    expect(typeof response2.body.user.photo).toBe("object");
  });
});
