(function() {
	"use strict";

var
	fs     = require('fs'),
	path   = require('path'),
	stylus = require('stylus');

module.exports = function (options) {
	var
		stylusUrl = stylus.url.apply(this, arguments);

	return function(url) {
		var 
			literal = new stylus.nodes.Literal('url("' + url.string + '")'),
			ext     = path.extname(url.string),
			found, buf;

		if(ext !== '.svg') {
			return stylusUrl.apply(this, arguments);
		}

		found = stylus.utils.lookup(url.string, options.paths);

		if(!found) return literal;

		buf = fs.readFileSync(found);

		return new stylus.nodes.Literal('url("data:image/svg+xml;utf8,' + buf + '")');
	};
};

})();