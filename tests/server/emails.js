import request from "supertest";
import { expect, it, describe } from "vitest";

import { app, user } from "../helpers";

const emailBody = {
  name: "Email test",
  subject: "Subject test",
  content: "Content test",
};

let emailID;

describe(`EMAILS`, () => {
  it("POST /emails", async () => {
    const response = await request(app)
      .post("/admin/api/emails")
      .send(emailBody)
      .set("Authorization", `Bearer ${user.access_token}`);

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("string");

    emailID = response.body;
  });

  it("GET /emails", async () => {
    const response = await request(app)
      .get("/admin/api/emails")
      .set("Authorization", `Bearer ${user.access_token}`);

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
      .set("Authorization", `Bearer ${user.access_token}`);

    const response2 = await request(app)
      .get("/admin/api/emails")
      .set("Authorization", `Bearer ${user.access_token}`);

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
      .set("Authorization", `Bearer ${user.access_token}`);

    expect(response.status).toBe(200);
  });
});
