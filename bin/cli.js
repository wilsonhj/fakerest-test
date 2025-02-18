#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .option('-e, --endpoint <url>', 'specify endpoint URL', 'http://test.brightsign.io:3000')
  .option('-r, --raw', 'output raw JSON')
  .option('-d, --debug', 'show debug information')
  .parse(process.argv);

const options = program.opts();

// Set environment variables for the main program
process.env.ENDPOINT = options.endpoint;
process.env.RAW_OUTPUT = options.raw ? 'true' : 'false';
process.env.DEBUG = options.debug ? 'true' : 'false';

require('../dist/index.js'); 