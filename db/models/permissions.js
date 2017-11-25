const db = require('../../db');

function getStoresByUserId(userId) {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    const query = `SELECT store_id
    FROM permissions
    WHERE user_id = ${userId};`;
    const params = '';
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
  getStoresByUserId,
}
