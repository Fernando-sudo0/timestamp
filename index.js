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
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", function (req, res) {
  var date;
  var unix
  const sourDate = req.params.date

  if (Math.floor(new Date(sourDate)) == null){

    res.json({ error : "Invalid Date" })
  }
  else{

    if (isNaN(sourDate)){
           
        unix = Math.floor(new Date(sourDate));
        date= new Date(sourDate).toUTCString();
    }
    else{
    unix = Math.floor(sourDate);
    date = new Date(parseInt(sourDate)).toUTCString();
    
  }
  res.json({unix :  unix , utc : date})
}
  
 
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
