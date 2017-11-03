const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('This is the home page;')
})

app.get('/test', function (req, res) {
  res.send('This is the test get;')
})

app.post('/test', function (req, res) {
  res.send('This is the test post;')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

