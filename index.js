
var express = require('express');
var ZaloOA = require('zalo-sdk').ZaloOA;
var request = require('request');

const server = express();

server.use('/public', express.static('public'));

var oaid = '1187402161946668067';
var secretKey = '5B2mFnLsEHRtoLI8C7lS';

var zaConfig = {
  oaid: oaid,
  secretkey: secretKey
}
var ZOAClient = new ZaloOA(zaConfig);

server.get('/', (req, res) => {
  res.send('Hello World! ', oaid, secretKey);
});

server.get('/webhook', (req, res) => {

  var data = req.query;
  var message = data.message;
  var userId = data.fromuid;
  console.log(data);
  var returnMessage = "Bạn vừa nói: " + message;
  console.log("User", userId, "had send a message.", message);
  if (userId && message) {

    ZOAClient.api('getprofile', { uid: userId }, function (response) {
      var profile = response.data;
      var returnMessage = "Chào " + profile.displayName + ". Bạn vừa nói: " + message;
      ZOAClient.api('sendmessage/text', 'POST', { uid: userId, message: returnMessage }, function (profileResponse) {
      });
    });
  }
})


var listener = server.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function () {
  console.log("Server listening at: " + listener.address().address + ":" + listener.address().port);
});
