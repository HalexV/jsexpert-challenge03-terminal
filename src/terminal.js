import DraftLog from 'draftlog';
import chalkTable from 'chalk-table';
import chalk from 'chalk'
import readline from 'readline';
import terminalConfig from './config/terminal.js';

const TABLE_OPTIONS = terminalConfig.tableOptions;

class CustomTerminal {
  constructor() {
    this.printQuestion = 'Qual o cargo e sua expectativa salarial? (cargo;valor)'
    this.errorMessage = ''
    this.data = [];
    this.terminal = null;
    this.display = null
  }

  initialize() {
    DraftLog.into(console).addLineListener(process.stdin)
    this.terminal = readline.createInterface({
      input: process.stdin,
    })

    this.initializeTable()
  }

  initializeTable() {
    const table = chalkTable(TABLE_OPTIONS, [])
    
    this.display = console.draft(`${table}\n${this.errorMessage}\n${this.printQuestion}`)
    
  }

  updateTable(item) {
    this.data.push(item)
    const table = chalkTable(TABLE_OPTIONS, this.data)
    this.errorMessage = ''
    this.display(`${table}\n${this.errorMessage}\n${this.printQuestion}`)
   
  }

  async question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, (input) => {
      readline.moveCursor(process.stdout, 0, -3)
      readline.clearScreenDown(process.stdout)
      readline.moveCursor(process.stdout, 0, 3)
      resolve(input)
    }))
  }

  printError(message) {
    const table = chalkTable(TABLE_OPTIONS, this.data)
    this.errorMessage = chalk.red(message)
    this.display(`${table}\n${this.errorMessage}\n${this.printQuestion}`)
  }

  closeTerminal() {
    this.terminal.close()
  } 
  
}

export default CustomTerminal;
