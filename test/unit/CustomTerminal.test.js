import { afterEach, describe, it } from 'mocha'
import Draftlog from 'draftlog'
import CustomTerminal from '../../src/terminal.js'
import { expect } from 'chai'
import sinon from 'sinon'

describe('Terminal Suite Tests', () => {

  afterEach(() => {
    sinon.restore()
  })
  
  describe('initialize', () => {

    it('should call Draftlog once with console when initialize is called', () => {
      const sut = new CustomTerminal()

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

  })

})