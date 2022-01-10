import DraftLog from 'draftlog';
import chalkTable from 'chalk-table';
import chalk from 'chalk';
import readline from 'readline';
import terminalConfig from './config/terminal.js';

const TABLE_OPTIONS = terminalConfig.tableOptions;

class CustomTerminal {
  constructor() {
    this.print = {};
    this.data = [];
    this.terminal = null;
  }

  initialize() {
    DraftLog.into(console).addLineListener(process.stdin)
    this.terminal = readline.Interface({
      input: process.stdin,
      output: process.stdout,
    })

    this.initializeTable()
  }

  initializeTable() {
    return null
  }
  
}

export default CustomTerminal;
