#!/usr/bin/env node
var mini_harp,
    parseArgs,
    args,
    port;
  
mini_harp = require('../index.js');
parseArgs = require('minimist');
args = parseArgs(process.argv);

port = args.port || 4000;
root = args._[2] || process.cwd();
console.log(root)

console.log('Starting http server on http://localhost:' + port);

mini_harp(root).listen(port);

