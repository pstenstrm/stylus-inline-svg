var
	stylus = require('stylus'),
	inlineSVG = require('../index'),
	fs = require('fs'),
	str = fs.readFileSync(__dirname + '/src/main.styl');

stylus(String(str))
	.set('filename', 'main.css')
	.define('url', stylus.url({'paths': [__dirname + '/src']}))
	.render(function (err, data) {
		if(err) throw err;

		console.log(data);
	});