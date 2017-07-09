var request = require('request');
var express = require('express');
var cors = require('cors');
var Webtask    = require('webtask-tools');

var app = express();

app.use(cors())

app.get('', function(req, res) {
  request('http://chainz.cryptoid.info/explorer/api.dws?q=summary', function (error, response, body) {
    res.json(JSON.parse(body));
  });
});

app.get('/peers', function(req, res){
  request('http://chainz.cryptoid.info/explorer/index.peers.dws?coin=' + req.query.coin, function (error, response, body) {
    res.json(JSON.parse(body));
  });

})

app.listen('8081')

module.exports = Webtask.fromExpress(app);
