var jade = require('jade'),
    fs = require('fs'),
    path = require('path');

module.exports = makeJade;

function makeJade(root) {
  return function(req, res) {
    var notFound = 0,
        html = '';

    if (path.extname(req.url) !== '.html') {
      res.writeHead(404);
      res.end();
    }

    try {
      html = fs.readFileSync(root + req.url, {encoding: 'utf8'});
    } catch (e) {
      notFound++;
    }

    if (notFound === 1) {
      try {
        var file = fs.readFileSync(root + req.url.replace('.html', '.jade'), {encoding: 'utf8'});
      } catch (e) {
        res.writeHead(404);
        res.end();
      }

      html = jade.compile(file)();
    }

    res.writeHead(200);
    res.write(html);
    res.end();
  };
};