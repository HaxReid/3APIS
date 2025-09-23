import { app } from "../index.js";
import supertest from "supertest";
import assert from "assert/strict";
describe("GET /api/user", () => {
  it("should respond 200", async () => {
    await supertest(app).get("/api/user").expect(200);
  });

  it("should send users array", async () => {
    const response = await supertest(app).get("/api/user");
    assert.deepEqual(response.body, [
      { name: "Loic", id: 1 },
      { name: "Mael", id: 2 },
      { name: "Francois", id: 4 },
    ]);
  });
});
