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

describe("DELETE /api/comments/:comment_id", () => {
  it("should respond with a 204 status code with no content", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  it("should respond with a 404 status code when attempting to DELETE a resource that does not exist", () => {
    return request(app)
      .delete("/api/comments/99999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comments not found");
      });
  });
  it("should respond with a 400 status code when attempting to DELETE a resource by an invalid ID", () => {
    return request(app)
      .delete("/api/comments/not-an-ID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("PACTH /api/comments/:comment_id", () => {
  it("should respond with a 201 status code and a incremented votes value of a article object from the given id", () => {
    const newComment = {
      body: "Front End developer",
      votes: 10,
    };
    return request(app)
      .patch("/api/comments/1")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        console.log(comment);
        expect(comment).toHaveProperty("body");
        expect(comment).toHaveProperty("votes");
        expect(typeof comment.body).toBe("string");
        expect(typeof comment.votes).toBe("number");
      });
  });
  it("should respond with a 201 status code and a decremented votes value of a article object from the given id", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ votes: 80 })
      .expect(201)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toHaveProperty("votes", 80);
        expect(typeof article.votes).toBe("number");
      });
  });
});
