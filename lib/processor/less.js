var less = require('less'),
    fs = require('fs'),
    path = require('path');

module.exports = makeLess;

function makeLess(root) {
  return function(req, res, next) {
    if (path.extname(req.url) !== '.css') {
      return next();
    } else {
      fs.readFile(root + req.url, {encoding: 'utf8'}, function(err, file) {
        if (err) {
          fs.readFile(root + req.url.replace('.css', '.less'), {encoding: 'utf8'}, function(error, data) {
            if (error) {
              return next();
            } else {
              less.render(data, function(err, css) {
                res.writeHead(200, {
                  'Content-Length': css.length,
                  'Content-Type': 'text/css; charset=UTF-8'
                });
                res.end(css);
              });
            }
          });
        } else {
          res.writeHead(200, {
            'Content-Length': file.length,
            'Content-Type': 'text/css; charset=UTF-8'
          });
          res.end(file || '');
        }
      });
    }
  };
};