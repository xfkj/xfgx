var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var join = require('path').join;
var mail = require('./mail');

app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
	res.status(200).sendFile(join(__dirname, 'index.html'));
});

app.post('/leaveWord', function(req, res) {
	var username = req.body.user_name,
		mobile = req.body.user_telephone,
		leaveWord = req.body.user_leaveWord;
	mail(username, mobile, leaveWord, function(err, msg) {
		if (err) { console.log(err.message);}
		// return res.send(msg);
	})
	res.send('预约成功，谢谢🙏');
});

app.listen(8888, function() { console.log('server start') });

