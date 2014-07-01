var less = require('less'),
    fs = require('fs'),
    path = require('path');

module.exports = makeLess;

function makeLess(root) {
  return function(req, res, next) {
    if (path.extname(req.url) !== '.css') {
      return next();
    }

    fs.readFile(root + req.url, {encoding: 'utf8'}, function(err, file) {
      if (err) {
        fs.readFile(root + req.url.replace('.css', '.less'), {encoding: 'utf8'}, function(error, data) {
          if (error) {
            res.writeHead(404);
            res.end();
          } else {
            less.render(data, function(err, css) {
              res.writeHead(200);
              res.end(css);
            });
          }
        });
      } else {
        res.writeHead(200);
        res.end(file || '');
      }

    });
  };
};