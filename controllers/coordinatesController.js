const coordinates = require('../db/models/coordinates');

async function getBlank(req, res, next) {
  res.send('get blank worked');
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

module.exports = {
  getBlank,
  getTest,
  postTest,
}
