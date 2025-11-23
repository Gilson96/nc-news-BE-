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

describe("GET /api/users", () => {
  it("should responds with a 200 status code and an array containing all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        body.forEach((user) => {
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("name");
          expect(user).toHaveProperty("avatar_url");
          expect(typeof user).toBe("object");
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});

describe("POST /api/users/article", () => {
  it("should responds with a 201 status code and an object containing created article", () => {
    const newArticle = {
      title: "New article",
      topic: "mitch",
      author: "butter_bridge",
    };
    return request(app)
      .post("/api/users/article")
      .send(newArticle)
      .expect(201)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toHaveProperty("article_id");
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
        expect(typeof article).toBe("object");
        expect(typeof article.article_id).toBe("number");
        expect(typeof article.title).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.author).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
      });
  });
  it("should respond with a 400 status code when attempting to POST with incorrect fields", () => {
    const newArticle = {
      name: "New article",
      topic: "mitch",
      author: "butter_bridge",
      article_img_url: "",
    };
    return request(app)
      .post(`/api/users/article`)
      .send(newArticle)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid field");
      });
  });
});
