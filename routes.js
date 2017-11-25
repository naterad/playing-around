const express = require('express');
const router = new express.Router();
const coordinatesController = require('./controllers/coordinatesController');
const userController = require('./controllers/userController');
const storesController = require('./controllers/storesController');

router.use(function(req, res, next) {
		//allow CORS
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		//keep moving on after log
		next();
	});

router.route('/').get(coordinatesController.getBlank);
router.route('/junk').get(coordinatesController.getTest);
router.route('/test').post(coordinatesController.postTest);
router.route('/api/coords/email').post(coordinatesController.getCoordinatesByEmail);
router.route('/api/coords/24').post(coordinatesController.getStoreCoordinates24Hours);
router.route('/api/stores/email').post(storesController.getStores);

router.route('/api/login').post(userController.login);


module.exports = router;


// app.get('/', function (req, res) {
//   res.send('This is the home page;')
// })
// app.get('/test', function (req, res) {
//   connection.query('SELECT * from coordinates', function(err, rows, fields) {
//   connection.end();
//     if (!err) {
//       // console.log(rows);
//       res.send(rows)
//     } else {
//       // console.log('Error while performing Query.');
//       res.send('Error while performing Query.')
//     }
//   });
//   // res.send('This is the test get;')
// })
// app.post('/test', function (req, res) {
//   res.send('This is the test post;')
// })
