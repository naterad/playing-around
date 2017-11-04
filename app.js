const express = require('express');
const app = express();

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.send('This is the home page;')
})
app.get('/test', function (req, res) {
  res.send('This is the test get;')
})
app.post('/test', function (req, res) {
  res.send('This is the test post;')
})
app.listen(port, function () {
  console.log('App listening on port: '+ port);
})

// app.set('view engine', 'ejs'); // set the view engine to ejs
// app.use(express.static(__dirname + '/public')); // make express look in the public directory for assets (css/js/img)
// app.get('/', function(req, res) { // set the home page route
// 	res.render('index'); // ejs render automatically looks in the views folder
// });
