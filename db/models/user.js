const db = require('../../db');

function login(data) {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    const query = `SELECT first_name, last_name \
    FROM user \
    WHERE email = "${data.email}" \
    AND password = "${data.password}";`;
    const params = [];
    connection.query(query, params, (err, rows, fields) => {
      if(db.queryError(err, connection)) {
        return reject('Query failed');
      }
      db.forceConnectionRelease(connection);
      return resolve(rows);
    });
  });
}

function getDefaultTableNameByEmail(data) {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    const query = `SELECT table_name \
    FROM user AS u \
    JOIN store AS s \
    ON u.default_store_id = s.id \
    WHERE email = "${data.email}";`;
    const params = [];
    connection.query(query, params, (err, rows, fields) => {
      if(db.queryError(err, connection)) {
        return reject('Query failed');
      }
      db.forceConnectionRelease(connection);
      return resolve(rows);
    });
  });
}

function getUserNameByEmail(data) {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    const query = `SELECT table_name \
    FROM user AS u \
    JOIN store AS s \
    ON u.default_store_id = s.id \
    WHERE email = "${data.email}";`;
    const params = [];
    connection.query(query, params, (err, rows, fields) => {
      if(db.queryError(err, connection)) {
        return reject('Query failed');
      }
      db.forceConnectionRelease(connection);
      return resolve(rows);
    });
  });
}

function getUserIdByEmail(data) {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    const query = `SELECT id
    FROM user
    WHERE email = "${data.email}";`;
    const params = [];
    connection.query(query, params, (err, rows, fields) => {
      if(db.queryError(err, connection)) {
        return reject('Query failed');
      }
      db.forceConnectionRelease(connection);
      return resolve(rows);
    });
  });
}

module.exports = {
  login,
  getDefaultTableNameByEmail,
  getUserIdByEmail,
}
