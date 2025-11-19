const format = require("pg-format");
const db = require("../db/connection");

exports.checkIfExists = (tableName, field, value) => {
  const query = format(`SELECT * FROM %I WHERE %I = $1;`, tableName, field);

  return db.query(query, [value]).then(({ rows }) => {
    return rows.length > 0;
  });
};
