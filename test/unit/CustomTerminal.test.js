import { afterEach, describe, it } from 'mocha'
import Draftlog from 'draftlog'
import CustomTerminal from '../../src/terminal.js'
import { expect } from 'chai'
import sinon from 'sinon'
import readline from 'readline'
import chalkTable from 'chalk-table'
import chalk from 'chalk'

import terminalConfig from '../../src/config/terminal.js';

const TABLE_OPTIONS = terminalConfig.tableOptions;

describe('Terminal Suite Tests', () => {

  afterEach(() => {
    sinon.restore()
  })
  
  describe('initialize', () => {

    it('should call Draftlog once with console when initialize is called', () => {
      const sut = new CustomTerminal()

      sut.initializeTable = () => {
        return null
      }

      const intoStub = sinon.stub(Draftlog, 'into').callsFake(() => ({
        addLineListener: function () {
          return
        }
      }))

      sut.initialize()

      expect(intoStub.calledOnce).to.be.ok
      expect(intoStub.calledWith(console)).to.be.ok
    })

    it('should call addLineListener once with process.stdin when initialize is called', () => {
      const sut = new CustomTerminal()
      let calls = 0
      let argument = null 

      sut.initializeTable = () => {
        return null
      }

      sinon.stub(Draftlog, 'into').callsFake(() => ({
        addLineListener: function () {
          calls++
          argument = arguments['0']
        }
      }))

      sut.initialize()

      expect(calls).to.be.equal(1)
      expect(argument).to.be.deep.equal(process.stdin)
    })

    it('should initialize this.terminal with readline.createInterface', () => {
      const sut = new CustomTerminal()

      sut.initializeTable = () => {
        return null
      }

      const expected = 'ok'
      const expectedArgument = {
        input: process.stdin,
      }

      let actualArgument = null

      sinon.stub(Draftlog, 'into').callsFake(() => ({
        addLineListener: function () {
          return
        }
      }))

      sinon.stub(readline, 'createInterface').callsFake(function () {
        actualArgument = arguments['0']

        return 'ok'
      })

      sut.initialize()

      const result = sut.terminal

      expect(result).to.be.equal(expected)
      expect(actualArgument).to.be.deep.equal(expectedArgument)
    })

    it('should call initializeTable when initialize is called', () => {
      const sut = new CustomTerminal()

      let calls = 0

      sut.initializeTable = () => {
        calls++
        return null
      }

      sut.initialize()

      expect(calls).to.be.equal(1)
    })

  })

  describe('printError', () => {
    
    it('should assign error message to this.errorMessage', () => {
      const sut = new CustomTerminal()

      const message = 'any'
      
      const expected = chalk.red(message)
      
      sut.display = function () {
        return
      }

      sut.printError(message)

      const result = sut.errorMessage
      
      expect(result).to.be.equal(expected)
    })

    

  })

  describe('closeTerminal', () => {

    it('should call this.terminal.close when closeTerminal is called', () => {
      const sut = new CustomTerminal()
      let calls = 0

      sut.terminal = {
        close: () => {
          calls++
        }
      }

      sut.closeTerminal()

      expect(calls).to.be.equal(1)
    })

  })

})