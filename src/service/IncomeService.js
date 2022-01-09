import Income from './../entity/Income.js';

class IncomeService {
  constructor({ incomeRepository }) {
    this.incomeRepository = incomeRepository;
  }

  async generateIncomeFromString(incomeString, delimiter = ';') {
    if (typeof delimiter !== 'string') throw new Error('Delimiter must be a string')
    
    const [position, expectation] = incomeString.split(delimiter);

    // @TODO: Implement method
    return null;
  }
}

export default IncomeService;
