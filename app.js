const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

// mysql://ci77wdcljiikf94c:utg7yhluawxippi0@x3ztd854gaa7on6s.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ye3aswd5ea8hq56x

// const connection = mysql.createConnection({
//  host     : 'x3ztd854gaa7on6s.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//  user     : 'ci77wdcljiikf94c',
//  password : 'utg7yhluawxippi0',
//  database : 'ye3aswd5ea8hq56x'
// });
//
// connection.connect(function(err){
// if(!err) {
//    console.log("Database is connected ... \n\n");
// } else {
//   console.log(err);
//    console.log("Error connecting database ... \n\n");
// }
// });

let port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(routes);
app.get('*', (req, res) => res.redirect('/'));

app.listen(port, function () {
  console.log('App listening on port: '+ port);
})

// app.set('view engine', 'ejs'); // set the view engine to ejs
// app.use(express.static(__dirname + '/public')); // make express look in the public directory for assets (css/js/img)
// app.get('/', function(req, res) { // set the home page route
// 	res.render('index'); // ejs render automatically looks in the views folder
// });
