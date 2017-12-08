const coordinates = require('../db/models/coordinates');
const user = require('../db/models/user');
const stores = require('../db/models/stores');

async function getBlank(req, res, next) {
  res.send('API is up and working!');
}

async function getTest(req, res, next) {
  try {
    const coords = await coordinates.getCoordinates();
    res.send(coords);
  } catch(error) {
    next(error);
  }
}

async function postTest(req, res, next) {
  try {
    await coordinates.postCoordinates(req.body);
    res.send({success: true});
  } catch(error) {
    next(error);
  }
}

async function postTestBatch(req, res, next) {
  try {
    await coordinates.postCoordinatesBatch(req, req.body);
    res.send({success: true});
  } catch(error) {
    next(error);
  }
}

async function getCoordinatesByEmail(req, res, next) {
  try {
    const tableName = await user.getDefaultTableNameByEmail(req.body);
    if(!tableName || tableName.length != 1) {
      next('Could not find users table');
    }
    const result = await coordinates.getCoordinatesByTableName(tableName[0]);
    res.send(result);
  } catch(error) {
    next(error);
  }
}

async function getStoreCoordinates24Hours(req, res, next) {
  try {
    const tableName = await stores.getTableNameById(req.body);
    if(!tableName || tableName.length != 1) {
      next('Could not find users table');
    }
    console.log(tableName);
    const result = await coordinates.getCoordinatesByTableName24(tableName[0]);
    res.send(result);
  } catch(error) {
    next(error);
  }
}

module.exports = {
  getBlank,
  getTest,
  postTestBatch,
  postTest,
  getCoordinatesByEmail,
  getStoreCoordinates24Hours,
}
