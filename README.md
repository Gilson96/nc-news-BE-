# NCNews API

[Front-end Repo](https://github.com/Gilson96/nc-news-FE)

---

## Overview

This API serves as the backend for NCNews, where users can interact with articles, comments, topics, and votes.

---

## Technologies Used

* **Nodejs**
* **Express**
* **PostgreSQL**
* **pg / node-postgres**
* **Jest (Testing)**
* **Supertest**
* **Heroku for deployment**

---

## Features

* Fetch all articles with sorting and filtering
* Fetch a single article by ID (including comment count)
* Update article
* Upvote or remove votes from articles and comments
* Create new articles and comments
* Delete comments and articles
* Fetch all topics or create new ones
* Error handling for invalid routes, invalid inputs, etc.
* Test for database, controllers and routes.

---

## Endpoints

### GET /api
* Returns a JSON describing all available endpoints.

### GET /api/articles
* Returns all articles
  
### GET /api/articles?
* Query with sort_by='', order='', and topic=''

### GET /api/articles/:article_id
* Returns an article

### PATCH /api/articles/:article_id
* Updates votes and the title on an article

### DELETE /api/articles/:article_id
* Deletes an article

### GET /api/articles/:article_id/comments
* Returns all comments for an article

### POST /api/articles/:article_id/comments
* Creates a new comment belonging to an article

### PATCH /api/comments/:comment_id
* Updates a comment
  
### DELETE /api/comments/:comment_id
* Deletes a comment

### GET /api/topics
* Returns all topics

### POST /api/topics
* Creates a new topic
  
### DELETE /api/topics/:slug
* Deletes a topic
  
### GET /api/users
* Returns all users
  
### GET /api/users/article
* Creates an article belonging to a user

---

## Diagrams

![Diagrams](https://github.com/Gilson96/nc-news-BE-/blob/main/assets/nc_news.png?raw=true)


---

## How to set up this project

This project uses two PostgreSQL databases:
* A development database
* A test database
Environment variables are used to switch between them(configured in the ./db/connection.js)

### 1. Create two .env files at the project root:

.env.development

```
PGDATABASE=nc_news
```

.env.test

```
PGDATABASE=nc_news_test
```

### 2. Setup the databases:

```
npm run setup-dbs
npm run seed
```

---

### Getting started

```
# Clone the repository
git clone https://github.com/your-username/nc-news-BE.git

# Navigate to project folder
cd nc-news-BE

# Install dependencies
npm install

# Setup databases
npm run setup-dbs
npm run seed

# Run tests
npm test

# Start development server
npm run dev
```

---

### Testing
This project uses **Jest** and **Supertest**.

Run the entire test suite:

```
npm test
```

For more specific test suite
* articles.test.js
* topics.test.js
* comments.test.js
* users.test.js
  
```
npm test articles.test.js
```

---

## Contact

* LinkedIn: [Gilson de Almeida](linkedin.com/in/gilson-de-almeida)
* This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

