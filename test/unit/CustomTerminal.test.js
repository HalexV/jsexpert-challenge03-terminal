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

      const intoStub = sinon.stub(Draftlog, 'into').callsFake(() => 'ok')

      sut.initialize()

      expect(intoStub.calledOnce).to.be.ok
      expect(intoStub.calledWith(console)).to.be.ok
    })

  })

})