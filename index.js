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
			found, buf, optimized;

		if(ext !== '.svg') {
			return stylusUrl.apply(this, arguments);
		}

		found = stylus.utils.lookup(url.string, options.paths);

		if(!found) return literal;

		buf = fs.readFileSync(found);

		buf = String(buf)
			.replace(/<\?xml(.+?)\?>/, '')
			.replace(/^\s+|\s+$/g, '')
			.replace(/(\r\n|\n|\r)/gm, '');

		return new stylus.nodes.Literal("url('data:image/svg+xml;utf8," + buf + "')");
	};
};

})();