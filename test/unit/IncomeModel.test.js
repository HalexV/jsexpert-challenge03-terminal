import { describe, it, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon'
import Income from '../../src/entity/Income.js';

import validIncome from '../mocks/valid-income.js'

describe('IncomeModel Suite Tests', () => {
  
  afterEach(() => {
    sinon.restore()
  })

  describe('constructor', () => {

    it('should throw when an object is not passed', () => {
      
      expect(() => new Income()).to.throw()

    })

    it('should return formatted default values when an empty object is passed', () => {
      const sut = new Income({})

      const defaults = {
        position: 'No description',
        expectation: { currency: 'BRL', language: 'pt-BR', value: 1000.5 },
        conversion01:{ currency: 'USD', language: 'en-US', value: 1000.5 },
        conversion02:{ currency: 'EUR', language: 'en-GB', value: 1000.5 },
        conversion03:{ currency: 'RUB', language: 'ru-RU', value: 1000.5 },
      }

      const expected = {
        position: defaults.position,
        expectation: new Intl.NumberFormat(defaults.expectation.language, { style: 'currency', currency: defaults.expectation.currency }).format(defaults.expectation.value),
        conversion01: new Intl.NumberFormat(defaults.conversion01.language, { style: 'currency', currency: defaults.conversion01.currency }).format(defaults.conversion01.value),
        conversion02: new Intl.NumberFormat(defaults.conversion02.language, { style: 'currency', currency: defaults.conversion02.currency }).format(defaults.conversion02.value),
        conversion03: new Intl.NumberFormat(defaults.conversion03.language, { style: 'currency', currency: defaults.conversion03.currency }).format(defaults.conversion03.value),
      }

      const {id,...result} = sut.format()
      
      expect(typeof id).to.be.equal('number')
      expect(result).to.be.deep.equal(expected)
    })

  })

  describe('format', () => {

    it('should throw when static formatCurrency throws', () => {
      const sut = new Income({})

      sinon.stub(Income, 'formatCurrency').callsFake(() => {
        throw new Error()
      })

      expect(() => sut.format()).to.throw()
    })

    it('should return an object with values formatted when called', () => {
      const sut = new Income(validIncome)

      const { position, expectation, conversion01, conversion02, conversion03 } = validIncome

      const expected = {
        position,
        expectation: new Intl.NumberFormat(expectation.language, { style: 'currency', currency: expectation.currency }).format(expectation.value),
        conversion01: new Intl.NumberFormat(conversion01.language, { style: 'currency', currency: conversion01.currency }).format(conversion01.value),
        conversion02: new Intl.NumberFormat(conversion02.language, { style: 'currency', currency: conversion02.currency }).format(conversion02.value),
        conversion03: new Intl.NumberFormat(conversion03.language, { style: 'currency', currency: conversion03.currency }).format(conversion03.value),
      }

      const { id, ...result } = sut.format()

      expect(typeof id).to.be.equal('number')
      expect(result).to.be.deep.equal(expected)

    })

  })

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

    it('should return the correct currency format given the correct parameters', () => {
      const sut = Income

      const correctParams = {
        currency: 'BRL',
        value: 1000.5,
        language: 'pt-BR'
      }

      const expected = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1000.5)

      const result = sut.formatCurrency(correctParams)

      expect(result).to.be.equal(expected)
    })
  })
  
});
