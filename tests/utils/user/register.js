import request from "supertest";

const user = {
  first_name: "Nodestation",
  last_name: "Test",
  email: "test@nodestation.app",
  password: "qwerty12345",
};

const register = async (server) => {
  await request(server).post("/admin/api/auth/register").send({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password,
  });
};

export default register;
