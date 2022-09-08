const express = require("express");
const request = require("supertest");
const signup = require("./signup");

const app = express();
app.post("api/users/signup", signup);

describe("test signup controller", () => {
  beforeAll(() => app.listen(3000));
  // afterAll((()=> app.close()));

  test("signup user info", async () => {
    const response = await request(app).post("/api/users/signup");
    console.log(response);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    const [user] = response.body;
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
