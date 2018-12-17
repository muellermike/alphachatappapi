var express = require('express');
var router = express.Router();

var chatHistory = [];
var chatrooms = ['Allgemeines'];
var blacklistRegex = /(arschloch|wixer|wixxer|hurensohn|penis|neger|scheisse|scheiss|shit|asshole)/gi;

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
  var history = [];
  var chatroom = req.query.chatroom;
  chatHistory.forEach(element => {
    console.log(element.chatroom);
    if(element.chatroom === chatroom){
      history.push(element);
    }
  });
  res.send(history);
});

router.post('/history', function (req, res, next) {
  var date = new Date();

  console.log(req.body);
  var msg = req.body.message;
  msg = msg.replace(blacklistRegex, '***');
  chatHistory.push({ message: msg, nickname: req.body.nickname, date: date, chatroom: req.body.chatroom });

  res.json({ message: 'History created!' });
});

router.get('/chatrooms', function(req, res, next){
  res.send(chatrooms);
});

router.post('/chatrooms', function(req, res, next){
  console.log(req.body.chatroom);
  chatrooms.push(req.body.chatroom);

  res.json({ chatroom: req.body.chatroom});
});

module.exports = router;
