import request from "supertest";
import { expect, it, describe, beforeAll, afterAll } from "vitest";

import { createApp, login } from "../utils/index.js";

const formBody = {
  name: "Form test",
  status: "active",
  fields: [
    {
      name: "Email",
      slug: "email",
      type: "short_text",
      required: false,
    },
    {
      name: "First name",
      slug: "first_name",
      type: "short_text",
      required: false,
    },
    {
      name: "Last name",
      slug: "last_name",
      type: "short_text",
      required: false,
    },
  ],
  settings: {
    send_email_admin: { active: false },
    auto_responder: { active: false },
  },
};

const entryFormBody = {
  email: "test@nodestation.app",
  first_name: "Nodestation",
  last_name: "Test",
};

let fileID;
let entryID;

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

  it("POST /forms", async () => {
    const response = await request(app)
      .post("/admin/api/forms")
      .send(formBody)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("string");

    fileID = response.body;
  });

  it("GET /forms", async () => {
    const response = await request(app)
      .get("/admin/api/forms")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body) && response.body.length > 0).toBe(true);
  });

  it("PUT /forms/:id", async () => {
    const response = await request(app)
      .put(`/admin/api/forms/${fileID}`)
      .send({ ...formBody, name: "Form test edit" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "ok",
    });
  });

  it("POST /api/system/forms/:id", async () => {
    const response = await request(app)
      .post(`/api/system/forms/${fileID}`)
      .send(entryFormBody);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "ok",
    });
  });

  it("GET /forms/:id", async () => {
    const response = await request(app)
      .get(`/admin/api/forms/${fileID}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      form: {
        id: expect.any(String),
        type: "form",
        name: "Form test edit",
        status: formBody.status,
        fields: expect.any(Array),
        settings: {
          send_email_admin: expect.any(Object),
          auto_responder: expect.any(Object),
        },
      },
      incoming: [
        {
          id: expect.any(String),
          email: entryFormBody.email,
          first_name: entryFormBody.first_name,
          last_name: entryFormBody.last_name,
          is_read: 0,
          archived: 0,
          created_at: expect.any(Number),
        },
      ],
    });

    entryID = response.body.incoming[0].id;
  });

  it("PUT /forms/:id/entry/:entry_id", async () => {
    const response = await request(app)
      .put(`/admin/api/forms/${fileID}/entry/${entryID}`)
      .send({
        is_read: true,
        archived: true,
      })
      .set("Authorization", `Bearer ${token}`);

    const response2 = await request(app)
      .get(`/admin/api/forms/${fileID}?archived=1`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ status: "ok" });

    expect(response2.status).toBe(200);
    expect(response2.body.incoming).toMatchObject([
      {
        id: expect.any(String),
        email: entryFormBody.email,
        first_name: entryFormBody.first_name,
        last_name: entryFormBody.last_name,
        is_read: 1,
        archived: 1,
        created_at: expect.any(Number),
      },
    ]);
  });

  it("DELETE /forms/:id/entry/:entry_id", async () => {
    const response = await request(app)
      .delete(`/admin/api/forms/${fileID}/entry/${entryID}`)
      .set("Authorization", `Bearer ${token}`);

    const response2 = await request(app)
      .get(`/admin/api/forms/${fileID}?archived=1`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "ok",
    });

    expect(
      Array.isArray(response2.body.incoming) &&
        response2.body.incoming.length === 0
    ).toBe(true);
  });

  it("DELETE /forms/:id", async () => {
    const response = await request(app)
      .delete(`/admin/api/forms/${fileID}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "ok",
    });
  });
});
