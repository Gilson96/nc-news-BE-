const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed");
const db = require("../db/connection.js");
const data = require("../db/data/test-data");
// const jwt = require("jsonwebtoken");

// require("dotenv").config({
//   path: `${__dirname}/../.env.${process.env.JWT_SECRET_KEY}`,
// });

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

xdescribe("checks if attempting to access a non-existent endpoint", () => {
  it("should respond with a 404 status code for invalid endpoint", () => {
    return request(app).get("/api/invalid-endpoint").expect(404);
  });
});

xdescribe("GET /api/topics", () => {
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

xdescribe("GET /api/users", () => {
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

xdescribe("POST /api/signIn ", () => {
  it("sign", () => {
    const signIn = {
      username: "he",
      password: "sfa",
      name: "gras",
      avatar_url: "fasa",
    };
    return request(app)
      .post(`/api/signIn`)
      .send(signIn)
      .expect(201)
      .then(({ body }) => {
        console.log(body);
      });
  });
});

xdescribe("GET /api/login ", () => {
  it("login", () => {
    return request(app)
      .get("/api/login")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
      });
  });
});

xdescribe("GET /api/articles", () => {
  it("should responds with a 200 status code and an array containing all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        body.forEach((article) => {
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("count");
          expect(typeof article).toBe("object");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.count).toBe("string");
        });
      });
  });
  it("should responds with a 200 status code and an array containing all article sorted and ordered by the given request body", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=ASC&topic=mitch")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
      });
  });
  it("should responds with a 200 status code and an array containing all article filtered by topic", () => {
    const sortBy = {
      sort_by: "votes",
      order: "ASC",
    };
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .send(sortBy)
      .then(({ body }) => {});
  });
});

xdescribe("GET /api/articles/:article_id", () => {
  it("should respond with a 200 status code and a article object from the given id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(body).toHaveProperty("article");
        expect(typeof article).toBe("object");
        expect(article).toHaveProperty("article_id", 1);
      });
  });
  it("should respond with a 200 status code and a article object from the given id with a new column comment_count", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(body).toHaveProperty("article");
        expect(typeof article).toBe("object");
        expect(article).toHaveProperty("count");
        expect(typeof article.count).toBe("string");
      });
  });
  it("should respond with a 404 status code when attempting to GET a resource by a valid ID that does not exist in the database", () => {
    return request(app)
      .get("/api/articles/99999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No results");
      });
  });
  it("should respond with a 400 status code when attempting to GET a resource by an invalid ID", () => {
    return request(app)
      .get("/api/articles/not-an-ID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

xdescribe("GET /api/articles/:article_id/comments", () => {
  it("should respond with a 200 status code and a list of comments", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        body.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
          expect(typeof comment).toBe("object");
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
        });
      });
  });
  it("should respond with a 404 status code when attempting to GET a resource by a valid ID that does not exist in the database", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No results");
      });
  });
  it("should respond with a 400 status code when attempting to GET a resource by an invalid ID", () => {
    return request(app)
      .get("/api/articles/not-an-ID/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

xdescribe("POST /api/articles/:article_id/comments", () => {
  it("should respond with a 201 and a new comment object created from the given article id", () => {
    const newComment = {
      body: "New comment.",
      username: "butter_bridge",
    };
    return request(app)
      .post(`/api/articles/1/comments`)
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toHaveProperty("body");
        expect(article).toHaveProperty("author");
        expect(typeof article).toBe("object");
        expect(typeof article.body).toBe("string");
        expect(typeof article.author).toBe("string");
      });
  });
  it("should respond with a 400 status code when attempting to POST with incorrect fields", () => {
    const newComment = {
      title: "New comment.",
      username: "butter_bridge",
    };
    return request(app)
      .post(`/api/articles/1/comments`)
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  it("should respond with a 400 status code when attempting to POST with valid fields but the value of a field is invalid", () => {
    const newComment = {
      body: 1,
      username: "butter_bridge",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("PACTH /api/articles/:article_id", () => {
  it.only("should respond with a 201 status code and a incremented votes value of a article object from the given id", () => {
    const newVotes = { votes: 10 };
    return request(app)
      .patch("/api/articles/1")
      .send(newVotes)
      .expect(201)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toHaveProperty("votes", 110);
        expect(typeof article.votes).toBe("number");
      });
  });
  it("should respond with a 201 status code and a decremented votes value of a article object from the given id", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ votes: -20 })
      .expect(201)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toHaveProperty("votes", 80);
        expect(typeof article.votes).toBe("number");
      });
  });
});

xdescribe("DELETE /api/comments/:comment_id", () => {
  it("should respond with a 204 status code with no content", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  it("should respond with a 404 status code when attempting to DELETE a resource that does not exist", () => {
    return request(app)
      .delete("/api/comments/99999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
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
