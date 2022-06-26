// index.js
// where your node app starts
require('dotenv').config()
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  console.log(req);
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", function (req, res) {
  const year = parseInt(req.params.date.substring(0,4));
  const month = parseInt(req.params.date.substring(5,7)) ;
  const day = parseInt(req.params.date.substring(8,10));
  const date=  new Date(year, month - 1, day,00,0,0,0);
  const unix = Math.floor(date / 1000);

  res.json({unix :  unix , utc : date.toUTCString()})
  
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
