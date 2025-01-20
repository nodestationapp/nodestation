import request from "supertest";
import { expect, it, describe, beforeAll, afterAll } from "vitest";

import { createApp, login } from "../utils/index.js";

const emailBody = {
  name: "Email test",
  subject: "Subject test",
  content: "Content test",
};

let emailID;

describe(`Emails`, () => {
  let app;
  let token;

  beforeAll(async () => {
    app = await createApp();
    token = await login(app);
  });

  afterAll(async () => {
    app.close();
  });

  it("POST /emails", async () => {
    const response = await request(app)
      .post("/admin/api/emails")
      .send(emailBody)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("string");

    emailID = response.body;
  });

  it("GET /emails", async () => {
    const response = await request(app)
      .get("/admin/api/emails")
      .set("Authorization", `Bearer ${token}`);

    const addedEmail = response.body.find((item) => item.id === emailID);

    expect(response.status).toBe(200);
    expect(addedEmail).toMatchObject({
      id: emailID,
      type: "em",
      name: emailBody.name,
      subject: emailBody.subject,
      content: emailBody.content,
    });
  });

  it("PUT /emails/:id", async () => {
    const response = await request(app)
      .put(`/admin/api/emails/${emailID}`)
      .send({
        name: `${emailBody.name} edit`,
        subject: `${emailBody.subject} edit`,
        content: `${emailBody.content} edit`,
      })
      .set("Authorization", `Bearer ${token}`);

    const response2 = await request(app)
      .get("/admin/api/emails")
      .set("Authorization", `Bearer ${token}`);

    const updatedEmail = response2.body.find((item) => item.id === emailID);

    expect(response.status).toBe(200);
    expect(updatedEmail).toMatchObject({
      id: emailID,
      type: "em",
      name: `${emailBody.name} edit`,
      subject: `${emailBody.subject} edit`,
      content: `${emailBody.content} edit`,
    });
  });

  it("DELETE /emails/:id", async () => {
    const response = await request(app)
      .delete(`/admin/api/emails/${emailID}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
