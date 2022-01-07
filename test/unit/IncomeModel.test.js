import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon'
import Income from '../../src/entity/Income.js';


describe('IncomeModel Suite Tests', () => {
  
  describe('static formatCurrency', () => {
    
    it('should throw if currency is not a string', () => {
      const sut = Income

      const invalidParams = {
        currency: 1,
        value: 'any',
        language: 'any'
      }

      expect(() => sut.formatCurrency(invalidParams)).to.throw('Currency must be a string')
    })

    it('should throw if value is not a number', () => {
      const sut = Income

      const invalidParams = {
        currency: 'any',
        value: 'any',
        language: 'any'
      }

      expect(() => sut.formatCurrency(invalidParams)).to.throw('Value must be a number')
    })

    
  })
  
});
