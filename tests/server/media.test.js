import path from "path";
import axios from "axios";
import request from "supertest";
import { expect, it, describe, beforeAll, afterAll } from "vitest";

import { createApp, login } from "../utils/index.js";

const mediaBodyDataset = {
  aws: {
    bucket: process.env.AWS_BUCKET,
    region: process.env.AWS_REGION,
    access_key_id: process.env.AWS_ACCESS_KEY_ID,
    secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  },
  digitalocean: {
    bucket: process.env.DIGITALOCEAN_BUCKET,
    region: process.env.DIGITALOCEAN_REGION,
    spaces_endpoint: process.env.DIGITALOCEAN_ENDPOINT,
    access_key_id: process.env.DIGITALOCEAN_ACCESS_KEY_ID,
    secret_access_key: process.env.DIGITALOCEAN_SECRET_ACCESS_KEY,
  },
  local: {},
};

let mediaID;
const filePath = path.join(process.cwd(), "LICENSE");

for await (const key of Object.keys(mediaBodyDataset)) {
  const body = mediaBodyDataset[key];

  describe(`Media - ${key}`, () => {
    let app;
    let token;

    beforeAll(async () => {
      app = await createApp();
      token = await login(app);
    });

    afterAll(async () => {
      app.close();
    });

    it("PUT /admin/api/media/settings", async () => {
      const response = await request(app)
        .put("/admin/api/media/settings")
        .send({ [key]: { ...body }, active: key })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: "ok",
      });
    });

    it("POST /media", async () => {
      const response = await request(app)
        .post("/admin/api/media")
        .set("Authorization", `Bearer ${token}`)
        .attach("files", filePath);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: "ok",
      });
    });

    it("GET /media", async () => {
      const response = await request(app)
        .get("/admin/api/media")
        .set("Authorization", `Bearer ${token}`);

      const uploadedMedia = response.body[response.body.length - 1];
      mediaID = uploadedMedia.id;

      let response2;
      if (key === "local") {
        const endpoint = uploadedMedia.url.split("/uploads").pop();
        response2 = await request(app).get(endpoint);
      } else {
        response2 = await axios.get(uploadedMedia.url);
      }

      expect(typeof mediaID).toBe("number");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body) && response.body.length > 0).toBe(
        true
      );
      expect(response2.status).toBe(200);
    });

    it("DELETE /media/:id", async () => {
      const response = await request(app)
        .delete(`/admin/api/media/${mediaID}`)
        .set("Authorization", `Bearer ${token}`);

      const response2 = await request(app)
        .get("/admin/api/media")
        .set("Authorization", `Bearer ${token}`);

      const isFileRemoved = !response2.body.find((item) => item.id === mediaID);

      expect(response.status).toBe(200);
      expect(isFileRemoved).toBe(true);
      expect(response.body).toMatchObject({
        status: "ok",
      });
    });
  });
}
