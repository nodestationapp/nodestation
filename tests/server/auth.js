import request from "supertest";
import { expect, it, beforeAll, describe } from "vitest";

import { app, knex, user } from "../helpers";

beforeAll(async () => {
  await knex("nodestation_users").where({ email: user.email }).del();
});

describe(`Authentication`, () => {
  it("GET /user/check-admin - if not exist", async () => {
    const response = await request(app).get("/admin/api/user/check-admin");

    expect(response.status).toBe(200);
    expect(response.body.is_admin).toBe(false);
  });

  it("POST /auth/register", async () => {
    const response = await request(app).post("/admin/api/auth/register").send({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
  });

  it("GET /auth/login", async () => {
    const response = await request(app).post("/admin/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      access_token: expect.any(String),
    });

    user["access_token"] = response.body.access_token;
  });

  it("GET /user/me", async () => {
    const response = await request(app)
      .get("/admin/api/user/me")
      .set("Authorization", `Bearer ${user.access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      logs_count: expect.any(Number),
      forms_count: expect.any(Number),
      project_name: expect.any(String),
      user: {
        photo: null,
        type: "admin",
        status: "active",
        email: user.email,
        id: expect.any(String),
        last_name: user.last_name,
        first_name: user.first_name,
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
    const response = await request(app)
      .put(`/admin/api/user/me`)
      .send({
        first_name: `${user.first_name} edit`,
        last_name: `${user.last_name} edit`,
      })
      .set("Authorization", `Bearer ${user.access_token}`);

    const response2 = await request(app)
      .get("/admin/api/user/me")
      .set("Authorization", `Bearer ${user.access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "ok",
    });

    expect(response2.status).toBe(200);
    expect(
      response2.body.user.first_name === `${user.first_name} edit` &&
        response2.body.user.last_name === `${user.last_name} edit`
    ).toBe(true);
  });
});
