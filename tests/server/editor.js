import request from "supertest";
import { expect, it, describe } from "vitest";

import { user, app } from "../helpers";

const editorBodyDataset = [
  {
    type: "ep",
    name: "/nodestation-test",
    status: "active",
    content: `export default async (req, res) => {\n  try{\n    //your code here\n    return res.status(200).json({ status: "ok" });\n  }catch(err){\n    console.log(err);\n    return res.status(500).json({ error: "Something went wrong" });  \n  }\n}`,
    options: {
      middlewares: [],
      parser: "json",
      auth: [],
      method: "get",
    },
  },
  {
    type: "cron",
    name: "nodestation-cron-test",
    status: "active",
    content: `export default async () => {\n  try{\n    //your code here\n  }catch(err){\n    console.log(err);\n  }\n}`,
    options: {
      schedule: "*/10 * * * * *",
      timezone: "Asia/Bangkok",
    },
  },
  {
    type: "fn",
    name: "nodestation-fn-test",
    content: `export default async () => {\n  try{\n    //your code here\n  }catch(err){\n    console.log(err);\n  }\n}`,
  },
  {
    type: "mid",
    name: "nodestation-mid-test",
    content: `export default async (req, res, next) => {\n  //your code here\n  next();\n}`,
  },
];

for await (const body of editorBodyDataset) {
  let fileID;

  describe(`Editor - ${body.type}`, () => {
    it("POST /editor", async () => {
      const response = await request(app)
        .post("/admin/api/editor")
        .send(body)
        .set("Authorization", `Bearer ${user.access_token}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: expect.any(String),
        name: body.name,
      });

      fileID = response.body.id;
    });

    it("GET /editor", async () => {
      const response = await request(app)
        .get("/admin/api/editor")
        .set("Authorization", `Bearer ${user.access_token}`);
      expect(response.status).toBe(200);
    });

    if (body?.type === "ep") {
      it("GET /api/nodestation-test", async () => {
        const response = await request(app).get("/api/nodestation-test");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          status: "ok",
        });
      });
    }

    it("DELETE /editor", async () => {
      const response = await request(app)
        .delete(`/admin/api/editor/${fileID}`)
        .set("Authorization", `Bearer ${user.access_token}`);
      expect(response.status).toBe(200);
    });
  });
}
