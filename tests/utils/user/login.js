import request from "supertest";
import register from "./register";

const user = {
  email: "test@nodestation.app",
  password: "qwerty12345",
};

const login = async (server) => {
  const isAdmin = await request(server).get("/admin/api/user/check-admin");

  if (!isAdmin.body.is_admin) {
    await register(server);
  }

  const response = await request(server).post("/admin/api/auth/login").send({
    email: user.email,
    password: user.password,
  });

  return response.body.access_token;
};

export default login;
