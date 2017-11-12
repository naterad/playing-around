const user = require('../db/models/user');

async function login(req, res, next) {
  try {
    const result = await user.login(req.body);
    res.send(result);
  } catch(error) {
    next(error);
  }
}

module.exports = {
  login,
}
