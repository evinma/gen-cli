#! /usr/bin/env node

const { Command } = require('commander');

const generateHtml = require('../src/html')
const packageJson = require('../package.json')

const program = new Command();
program.version(packageJson.version);

program
  .option('-h, --html <name>', 'generate <name>.html', function (name) {
      generateHtml({ name })
  })
  .parse();
