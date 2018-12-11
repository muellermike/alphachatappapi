var express = require('express');
var router = express.Router();

var chatHistory = [];
var nicknames = [];

// Add headers
router.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Team Alpha Server ist ready ;)' });
});


// history
router.get('/history', function (req, res, next) {
  res.send(chatHistory);
});

router.post('/history', function (req, res, next) {
  var date = new Date();

  console.log(req.body);
  chatHistory.push({ message: req.body.message, nickname: req.body.nickname, date: date });

  res.json({ message: 'History created!' });
});

// nicknames
router.get('/nicknames', function (req, res, next) {
  res.send(nicknames);
});

router.get('/nicknames/:id', function (req, res, next) {
  for (var i = 0; nicknames.length > 0; i++) {
      if (nicknames[i] && nicknames[i].id === req.params.id) {
          res.send({ username: nicknames[i].username, id: nicknames[i].id });
      }
  }
});

router.post('/nicknames', function (req, res, next) {
  console.log(req.body);
  nicknames.push({ username: req.body.username, id: nicknames.length + 1 });

  res.json({ username: req.body.username });
});

module.exports = router;
