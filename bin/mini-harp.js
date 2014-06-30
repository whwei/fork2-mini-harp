#!/usr/bin/env node
var mini_harp,
    parseArgs,
    args,
    port;
  
mini_harp = require('../index.js');
parseArgs = require('minimist');
args = parseArgs(process.argv);
port = args.port || 4000;

console.log('Starting http server on http://localhost:' + port);
mini_harp().listen(port);

