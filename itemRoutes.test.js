const request = require("supertest");
const app = require("./app");

let items = require("./fakeDb");

beforeEach(() => {
  items.length = 0;
  items.push({
    name: "popsicle",
    price: 1.45
  });
});

afterAll(() => {
  items.length = 0;
});

describe("GET /items", () => {
  test("gets all items", async () => {
    const response = await request(app).get("/items");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        name: "popsicle",
        price: 1.45
      }
    ]);
  });
});

describe("POST /items", () => {
  test("adds a new item", async () => {
    const response = await request(app)
      .post("/items")
      .send({
        name: "cheerios",
        price: 3.4
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      added: {
        name: "cheerios",
        price: 3.4
      }
    });
  });
});

describe("GET /items/:name", () => {
  test("gets one item", async () => {
    const response = await request(app).get("/items/popsicle");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      name: "popsicle",
      price: 1.45
    });
  });
});

describe("PATCH /items/:name", () => {
  test("updates an item", async () => {
    const response = await request(app)
      .patch("/items/popsicle")
      .send({
        name: "new popsicle",
        price: 2.45
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      updated: {
        name: "new popsicle",
        price: 2.45
      }
    });
  });
});

describe("DELETE /items/:name", () => {
  test("deletes an item", async () => {
    const response = await request(app).delete("/items/popsicle");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Deleted"
    });
  });
});