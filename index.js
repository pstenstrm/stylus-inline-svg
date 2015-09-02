(function() {
	"use strict";

var
	fs     = require('fs'),
	path   = require('path'),
	parse  = require('url').parse,
	stylus = require('stylus');

module.exports = function (options) {
	var
		stylusUrl = stylus.url.apply(this, arguments);

	options = options || {paths: []};

	function fn(url) {
		var 
			localUrl = url,
			compiler = new stylus.Compiler(localUrl),
			ext, found, buf;

		compiler.isURL = true;
		localUrl = localUrl.nodes.map(function(node) {
			return compiler.visit(node);
		}).join('');

		localUrl = parse(localUrl);

		ext = path.extname(localUrl.href);

		if(ext !== '.svg') {
			return stylusUrl.apply(this, arguments);
		}

		found = stylus.utils.lookup(localUrl.pathname, options.paths);

		if(!found) return new stylus.nodes.Literal('url("' + localUrl.href + '")');

		buf = fs.readFileSync(found);

		buf = String(buf)
			.replace(/<\?xml(.+?)\?>/, '')
			.replace(/^\s+|\s+$/g, '')
			.replace(/>\s+</g, '><')
			.replace(/\s+/g, ' ')
			.replace(/(\r\n|\n|\r)/gm, '');

		return new stylus.nodes.Literal("url('data:image/svg+xml;charset=utf8," + buf + "')");
	}

	fn.raw = true;
	return fn;
};

})();