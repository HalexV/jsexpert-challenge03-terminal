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

    if (!position) throw new Error('Position is a required field. Please make sure you are providing a position.')
    if (expectation == undefined) throw new Error('IncomeString must contain a valid delimiter')

    const expectationValue = Number(expectation)


    if (!expectationValue) throw new Error('A valid Expectation is required. Please note that only numbers are allowed.')

    const { USD, EUR, GBP } = await this.incomeRepository.getConversions()

    const income = new Income({
      position,
      expectation: { currency: 'BRL', language: 'pt-BR', value: expectationValue },
      conversion01: { currency: 'USD', language: 'en-US', value: expectationValue * USD },
      conversion02: { currency: 'EUR', language: 'en-GB', value: expectationValue * EUR },
      conversion03: { currency: 'GBP', language: 'en-GB', value: expectationValue * GBP },
    })

    return income.format();
  }
}

export default IncomeService;
