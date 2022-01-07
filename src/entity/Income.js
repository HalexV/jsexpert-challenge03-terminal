import languageConfig from '../config/language.js';

const defaultLanguage = languageConfig.default;

class Income {
  static #id = 0;
  
  constructor({
    position,
    expectation,
    conversion01,
    conversion02,
    conversion03,
  }) {
    this.position = position || 'No description';
    this.expectation = expectation || { currency: 'BRL', language: 'pt-BR', value: 100.5 };
    this.conversion01 = conversion01 || { currency: 'USD', language: 'en-US', value: 100.5 };
    this.conversion02 = conversion02 || { currency: 'EUR', language: 'en-GB', value: 100.5 };
    this.conversion03 = conversion03 || { currency: 'RUB', language: 'ru-RU', value: 100.5 };
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
    const _language = language || defaultLanguage;

    if (typeof currency !== 'string') throw new Error('Currency must be a string')
    if (typeof value !== 'number') throw new Error('Value must be a number')
    if (typeof language !== 'string') throw new Error('Language must be a string')

    // TODO: Implement method
    return null;
  }
}

export default Income;
