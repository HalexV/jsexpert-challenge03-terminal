import chalk from 'chalk';

export default {
  tableOptions: {
    leftPad: 2,
    columns: [
      { field: 'id', name: chalk.cyan('ID') },
      { field: 'position', name: chalk.green('Position') },
      { field: 'expectation', name: chalk.yellow('Expectation (BRL)') },
      { field: 'conversion01', name: chalk.blue('USD') },
      { field: 'conversion02', name: chalk.magenta('EUR') },
      { field: 'conversion03', name: chalk.red('GBP') },
    ],
  },
};
