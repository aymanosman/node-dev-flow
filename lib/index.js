var path = require('path');
var express = require('express');
var app = express();

// An indeterminate amount of time before the server actually re-binds to the
// listening port
var PRETEND_DELAY = 1000;

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(req, res, next) {
  res.render('index');
});

var port = process.env.PORT || 3000;

setTimeout( function() {
  app.listen(port , function() {
    var msg = 'Express app listening on port: ' + port;
    console.log(msg);
    if (process.send) {
      // We've been spawned as a child process. Let the parent know we are
      // finished binding to the port.
      process.send(msg);
    }
  })
}, PRETEND_DELAY);
