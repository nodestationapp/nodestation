import request from "supertest";

const user = {
  first_name: "Nodestation",
  last_name: "Test",
  email: "test@nodestation.app",
  password: "@Qwerty12345",
  status: "active",
  type: "admin",
};

const register = async (server) => {
  await request(server)
    .post("/admin/api/auth/register")
    .send({ ...user });
};

export default register;
