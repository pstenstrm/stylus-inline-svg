# stylus-inline-svg

Wraps `stylus.url()` to inline SVG images as UTF8 instead of Base64. All other images are passed to the [stylus.url()](http://learnboost.github.io/stylus/docs/functions.url.html) method.

```js
var
	inlineSVG = require('stylus-inline-svg');

stylus(str)
	.set('filename', __dirname + '/css/test.styl')
	.define('url', inlineSVG({'paths': [__dirname + '/public']}))
	.render(function (err, css) {

	});
```