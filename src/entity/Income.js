
class Income {
  static #id = 0;
  
  constructor({
    position,
    expectation,
    conversion01,
    conversion02,
    conversion03,
  }) {

    if (position == undefined) {
      this.position = 'No description'
    } else if (typeof position !== 'string') {
      throw new Error('Position must be a string')
    } else {
      this.position = position;
    }

    this.expectation = expectation || { currency: 'BRL', language: 'pt-BR', value: 1000.5 };
    this.conversion01 = conversion01 || { currency: 'USD', language: 'en-US', value: 1000.5 };
    this.conversion02 = conversion02 || { currency: 'EUR', language: 'en-GB', value: 1000.5 };
    this.conversion03 = conversion03 || { currency: 'RUB', language: 'ru-RU', value: 1000.5 };
  }

  #getId() {
    return ++Income.#id
  }

  format() {
    return {
      id: this.#getId(),
      position: this.position,
      expectation: Income.formatCurrency(this.expectation),
      conversion01: Income.formatCurrency(this.conversion01),
      conversion02: Income.formatCurrency(this.conversion02),
      conversion03: Income.formatCurrency(this.conversion03),
    };
  }

  static formatCurrency({ currency, value, language }) {

    if (typeof currency !== 'string') throw new Error('Currency must be a string')
    if (typeof value !== 'number') throw new Error('Value must be a number')
    if (typeof language !== 'string') throw new Error('Language must be a string')

    const result = new Intl.NumberFormat(language, {style: 'currency', currency}).format(value)

    return result;
  }
}

export default Income;
