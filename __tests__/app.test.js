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

describe("GET /api/topics", () => {
  it("200 responds with an array containing all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        body.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
          expect(topic).toHaveProperty("img_url");
          expect(typeof topic).toBe("object");
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
          expect(typeof topic.img_url).toBe("string");
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  it("200 response with the article object of the given id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        console.log(body)
        expect(body).toHaveProperty("article");
        expect(typeof article).toBe("object");
        expect(article).toHaveProperty("article_id", 1);
      });
  });
});
