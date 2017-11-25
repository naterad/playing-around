const db = require('../../db');

function getStoresByIds(storeIds) {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    let ids = [];
    for(let store of storeIds) {
      ids.push(store.store_id)
    }
    ids = ids.join();
    const query = `SELECT *
    FROM store
    WHERE id IN (${ids});`;
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

function getTableNameById(data) {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    const query = `SELECT table_name
    FROM store
    WHERE id = ${data.storeId};`;
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
  getStoresByIds,
  getTableNameById,
}
