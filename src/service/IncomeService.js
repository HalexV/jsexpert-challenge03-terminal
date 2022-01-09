import Income from './../entity/Income.js';

class IncomeService {
  constructor({ incomeRepository }) {
    this.incomeRepository = incomeRepository;
  }

  async generateIncomeFromString(incomeString, delimiter = ';') {
    if (typeof incomeString !== 'string') throw new Error('IncomeString must be a string')
    if (typeof delimiter !== 'string') throw new Error('Delimiter must be a string')
    if (!incomeString) throw new Error('Position is a required field. Please make sure you are providing a position.')

    const [position, expectation] = incomeString.split(delimiter);

    if (expectation == undefined) throw new Error('IncomeString must contain a valid delimiter')

    const expectationValue = Number(expectation)

    if (!expectationValue) throw new Error('A valid Expectation is required. Please note that only numbers are allowed.')

    // @TODO: Implement method
    return null;
  }
}

export default IncomeService;
