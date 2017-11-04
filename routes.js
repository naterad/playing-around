const express = require('express');
const router = new express.Router();
const coordinatesController = require('./controllers/coordinatesController');


router.route('/')
  .get(coordinatesController.getBlank);

router.route('/test')
  .get(coordinatesController.getTest);

router.route('/test')
  .post(coordinatesController.postTest);

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
