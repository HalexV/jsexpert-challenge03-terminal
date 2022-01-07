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
        value: 1,
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

    it('should throw if language is not a string', () => {
      const sut = Income

      const invalidParams = {
        currency: 'any',
        value: 1,
        language: 1
      }

      expect(() => sut.formatCurrency(invalidParams)).to.throw('Language must be a string')
    })

    it('should throw if Intl.NumberFormat throws', () => {
      const sut = Income

      sinon.stub(Intl, 'NumberFormat').callsFake(() => {
        throw new Error()
      })

      const validParams = {
        currency: 'any',
        value: 1,
        language: 'any'
      }

      expect(() => sut.formatCurrency(validParams)).to.throw()
    })

    
  })
  
});
