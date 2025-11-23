const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed");
const db = require("../db/connection.js");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("checks if attempting to access a non-existent endpoint", () => {
  it("should respond with a 404 status code for invalid endpoint", () => {
    return request(app).get("/api/invalid-endpoint").expect(404);
  });
});

describe("POST /api/topics", () => {
  it("should respond with a 201 status code new topic object", () => {
    const newTopic = {
      slug: "Dancing",
    };
    return request(app)
      .post("/api/topics")
      .send(newTopic)
      .expect(201)
      .then(({ body }) => {
        const { topic } = body;
        expect(topic).toHaveProperty("slug");
        expect(typeof topic).toBe("object");
        expect(typeof topic.slug).toBe("string");
      });
  });
  it("should respond with a 400 status code if the topic slug already exists", () => {
    const newTopic = {
      slug: "cats",
    };
    return request(app)
      .post("/api/topics")
      .send(newTopic)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("This topic already exists");
      });
  });
});

describe("GET /api/topics", () => {
  it("should respond with a 200 status code and an array containing all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        body.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
          expect(typeof topic).toBe("object");
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("DELETE /api/topics/:slug", () => {
  it("should respond with a 204 status code ", () => {
    return request(app)
      .delete("/api/topics/cats")
      .expect(204)
      .then(({ body }) => {});
  });
  it("should respond with a 400 status code if the topic slug already exists", () => {
    const newTopic = {
      slug: "cats",
    };
    return request(app)
      .post("/api/topics")
      .send(newTopic)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("This topic already exists");
      });
  });
});
