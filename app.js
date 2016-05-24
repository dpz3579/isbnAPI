var isbn = require('node-isbn');
var express = require('express');
var app = new express();
process.env.PORT = 5018;

app.get('/isbn/:id', function(req, res) {
// 9781907410765  -- console.log(req.params.id);
	isbn.resolve(req.params.id, function (err, book) {
		if (!err) {
			var resp= {
				"statusCode":"200",
				"type":"OK",
				"code":"200",
				"data":book
				}
			res.status(200).send(resp);
		} else {
			var resp= {
				"statusCode":"404",
				"type":"Not Found",
				"code":"404",
				"data":err
				}
			res.status(404).send(resp);
		}
		
	});
});

app.get('*', function(req, res){
	var resp= {
		"statusCode":"403",
		"type":"fail",
		"code":"403",
		"data":"Forbidden"
		}
	res.status(403).send(resp);
});

app.listen(process.env.PORT,function(req,res){
	console.log("running at %d",process.env.PORT);
});

