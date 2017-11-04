const express = require('express');
const mysql = require('mysql');
let _pool;

const connectionLimit = 10;
const host = 'x3ztd854gaa7on6s.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
const user = 'ci77wdcljiikf94c';
const password = 'utg7yhluawxippi0';
const database = 'ye3aswd5ea8hq56x';

function getConnection() {
  return new Promise((resolve, reject) => {
    _getConnection((err, connection) => {
      const error = _connectionError(err, connection);
      if (error) {
        return reject(error);
      }
      return resolve(connection);
    });
  });
}

function _getConnection(callback) {
  if (_pool) {
    return _connectToPool(callback);
  }
  _connectToHost(callback);
}

function _connectToPool(callback) {
  _pool.getConnection((err, connection) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, connection);
  });
}

function _connectToHost(callback) {
  try {
    _pool = mysql.createPool({
      connectionLimit: 10,
      host: 'x3ztd854gaa7on6s.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: 'ci77wdcljiikf94c',
      password: 'utg7yhluawxippi0',
      database: 'ye3aswd5ea8hq56x',
    });
    _connectToPool(callback);
  } catch(error) {
    callback(error, null);
  }
}

function connectionNotReleased(connection) {
  return connection && _pool && _pool._freeConnections.indexOf(connection) == -1;
}

function forceConnectionRelease(connection) {
  if (connectionNotReleased(connection)) {
    connection.release();
  }
}

function _connectionError(err, connection) {
  if (err) {
    forceConnectionRelease(connection);
    return 'CONNECTION_ERROR - Could not connect to the database.';
  }
  return null;
}

function queryError(err, connection) {
  if (err) {
    return 'CONNECTION_ERROR - Query failed unexpectedly.';
  }
  return null;
}

module.exports = {
  getConnection,
  connectionNotReleased,
  forceConnectionRelease,
  queryError,
};
