var express = require('express');
var app = express();
// 사용자 정의 라우터 모듈
var birds = require('./birds');

// 동적 바인딩
app.get('/', function(req, res){
    res.send('Hello World');
});

// 정적 바인딩
// 둘다 사용 가능 __dirname를 사용하는 경우가 더 안전함
//app.use(express.static(__dirname + '/public'));
//app.use(express.static('public'));

// 가상 경로 접두부 추가
app.use('/static', express.static(__dirname + '/public'));


// next() 사용 (함수)
app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
  }, function (req, res) {
    res.send('Hello from B!');
  });

// next() 사용2 (함수 배열)
var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
}

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
}

var cb2 = function (req, res) {
    res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

// next() 사용3 (함수 + 함수배열)
var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
  }
  
var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from D!');
});

// app.route 사용
app.route('/book')
    .get(function(req, res) {
        res.send('Get a random book');
    })
    .post(function(req, res) {
        res.send('Add a book');
    })
    .put(function(req, res) {
        res.send('Update the book');
    });

// birds.js 사용
app.use('/birds', birds);

// res.render 사용($ npm install ejs)
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/render', function (req, res) {
    res.render('render.html')
});

// 3000포트 사용
app.listen(3000, function(){
    console.log('Conneted 3000 Port!');
});