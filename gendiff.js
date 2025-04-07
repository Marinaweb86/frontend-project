import{ Command } from 'commander';

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-h, --help','display help for command')
    program.parse();

    

// Если вызвана справка, выводим help
if (program.opts().help) {
  program.help();
}
