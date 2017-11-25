const coordinates = require('../db/models/coordinates');
const user = require('../db/models/user');
const stores = require('../db/models/stores');
const permissions = require('../db/models/permissions');



async function getStores(req, res, next) {
  try {
    const userId = await user.getUserIdByEmail(req.body);
    if(!userId) {
      next('Could not find user');
    }
    const storeIds = await permissions.getStoresByUserId(userId[0].id);
    if(!storeIds) {
      next('Could not find store ids');
    }
    const result = await stores.getStoresByIds(storeIds);
    res.send(result);
  } catch(error) {
    next(error);
  }
}

module.exports = {
  getStores,
}
