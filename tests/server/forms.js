import request from "supertest";
import { expect, it, describe } from "vitest";

import { app, user } from "../helpers";

const formBody = {
  name: "Form test",
  status: "active",
  fields: [
    {
      name: "Email",
      type: "short_text",
      required: false,
    },
    {
      name: "First name",
      type: "short_text",
      required: false,
    },
    {
      name: "Last name",
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
  it("POST /forms", async () => {
    const response = await request(app)
      .post("/admin/api/forms")
      .send(formBody)
      .set("Authorization", `Bearer ${user.access_token}`);

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("string");

    fileID = response.body;
  });

  it("GET /forms", async () => {
    const response = await request(app)
      .get("/admin/api/forms")
      .set("Authorization", `Bearer ${user.access_token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body) && response.body.length > 0).toBe(true);
  });

  it("PUT /forms/:id", async () => {
    const response = await request(app)
      .put(`/admin/api/forms/${fileID}`)
      .send({ ...formBody, name: "Form test edit" })
      .set("Authorization", `Bearer ${user.access_token}`);

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
      .set("Authorization", `Bearer ${user.access_token}`);

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
          id: expect.any(Number),
          data: {
            email: entryFormBody.email,
            first_name: entryFormBody.first_name,
            last_name: entryFormBody.last_name,
          },
          is_read: 0,
          archived: 0,
          form_id: fileID,
          updated_at: null,
          created_at: expect.any(Number),
        },
      ],
    });

    entryID = response.body.incoming[0].id;
  });

  it("PUT /forms/entry/:id", async () => {
    const response = await request(app)
      .put(`/admin/api/forms/entry/${entryID}`)
      .send({
        is_read: true,
        archived: true,
      })
      .set("Authorization", `Bearer ${user.access_token}`);

    const response2 = await request(app)
      .get(`/admin/api/forms/${fileID}?archived=1`)
      .set("Authorization", `Bearer ${user.access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ status: "ok" });

    expect(response2.status).toBe(200);
    expect(response2.body.incoming).toMatchObject([
      {
        id: expect.any(Number),
        data: {
          email: entryFormBody.email,
          first_name: entryFormBody.first_name,
          last_name: entryFormBody.last_name,
        },
        is_read: 1,
        archived: 1,
        form_id: fileID,
        updated_at: expect.any(Number),
        created_at: expect.any(Number),
      },
    ]);
  });

  it("DELETE /forms/entry/:id", async () => {
    const response = await request(app)
      .delete(`/admin/api/forms/entry/${entryID}`)
      .set("Authorization", `Bearer ${user.access_token}`);

    const response2 = await request(app)
      .get(`/admin/api/forms/${fileID}?archived=1`)
      .set("Authorization", `Bearer ${user.access_token}`);

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
      .set("Authorization", `Bearer ${user.access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "ok",
    });
  });
});
