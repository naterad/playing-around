const db = require('../../db');

function getCoordinates() {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    const query = 'SELECT * from `junk_coordinates`';
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

function postCoordinates(data) {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    const query = 'INSERT INTO `junk_coordinates` (`data`) VALUES (?)';
    const params = [
      JSON.stringify(data)
    ];
    connection.query(query, params, (err, rows, fields) => {
      if(db.queryError(err, connection)) {
        return reject('Query failed');
      }
      db.forceConnectionRelease(connection);
      return resolve();
    });
  });
}

function postCoordinatesBatch(req, data) {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    console.log(req);
    // console.log(data);
    // const query = 'INSERT INTO `junk_coordinates` (`data`) VALUES (?)';
    // const params = [
    //   JSON.stringify(data)
    // ];
    // connection.query(query, params, (err, rows, fields) => {
    //   if(db.queryError(err, connection)) {
    //     return reject('Query failed');
    //   }
    //   db.forceConnectionRelease(connection);
    //   return resolve();
    // });
  });
}


function getCoordinatesByTableName(data) {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    const query = `SELECT * from ${data.table_name};`;
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

// right now it is set to past 100 days
function getCoordinatesByTableName24(data) {
  return new Promise(async (resolve, reject) => {
    const connection = await db.getConnection();
    if(!connection) {
      return reject('Failed to get connection');
    }
    const query = `SELECT * from ${data.table_name}
    WHERE received_at >= now() - INTERVAL 100 DAY;`;
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
  getCoordinates,
  postCoordinates,
  getCoordinatesByTableName,
  getCoordinatesByTableName24,
}
