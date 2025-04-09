#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (stylish|json)', 'stylish')
  .action((filepath1, filepath2) => {
    try {
      const options = program.opts();
      console.log(gendiff(filepath1, filepath2, options.format));
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  });

program.parse();