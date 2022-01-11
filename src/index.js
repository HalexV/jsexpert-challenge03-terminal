import CustomTerminal from './terminal.js';
import IncomeService from './service/IncomeService.js';
import IncomeRepository from './repository/IncomeRepository.js'

const VOCABULARY = {
  STOP: ':q',
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService({
  incomeRepository: new IncomeRepository()
});

async function mainLoop() {
  
  try {
    
    const answer = await terminal.question()

    if (answer === VOCABULARY.STOP) {
      terminal.closeTerminal()
      console.log('Process finished!')
      return;
    }
    const income = await service.generateIncomeFromString(answer)
    terminal.updateTable(income)
    return mainLoop()
  } catch (error) {
    terminal.printError(error.message)
    return mainLoop()
  }
  
}

await mainLoop();
