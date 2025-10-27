const { Pool } = require("pg");
require("dotenv").config({
  path: `${__dirname}/../.env.${process.env.NODE_ENV || "development"}`,
});

const ENV = process.env.NODE_ENV || "development";

let config = {};


if (ENV === "production") {
  config = {
    connectionString: process.env.DATABASE_URL,
    max: 2,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Pool(config);

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
} else {
  console.log(
    `Connected to ${process.env.DATABASE_URL || process.env.PGDATABASE}`
  );
}

module.exports = db;
