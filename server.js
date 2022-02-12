// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function(req, res) {

  // Function to validate a date from a given date
  const isValidDate = (date) => {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }
  // Destructuring req.params object
  let { date } = req.params;

  // Converting unix timestamp date from string to int
  let unixDate = new Date(parseInt(date)).getTime();

  // Check if is a valid date
  if (isValidDate(date)) {
    // Convert date to unix timestamp
    unixDate = new Date(date).getTime();
    // return a JSON response
    res.json({ unix: unixDate, utc: new Date(date).toUTCString() });

  } else if (date == undefined) {

    res.json({ unix: Date.now(), utc: new Date(Date.now()).toUTCString() });

  } else if (date == unixDate) {

    res.json({ unix: unixDate, utc: new Date(parseInt(unixDate)).toUTCString() });

  } else {
    res.json({ error: "Invalid Date" });
  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
