import { describe, it, before } from 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon'
import { incomeRepositoryMock, mocks } from '../mocks/incomeRepository.mock.js';
import axios from 'axios'
import IncomeRepository from '../../src/repository/IncomeRepository.js';

import convertResponse from '../mocks/convert-response.js'

chai.use(chaiAsPromised)

const expect = chai.expect

const axiosStub = sinon.stub(axios, 'get').callsFake( async () => {
  return new Promise(resolve => resolve({data: 'ok'}))
} )

describe('IncomeRepository Suite Tests', () => {
  let repository = {};

  before(() => {
    repository = incomeRepositoryMock;
  });

  describe('makeRequest', () => {
    it('should call axios with the url passed', async () => {
      const sut = new IncomeRepository()
      await sut.makeRequest('valid_url')
      
      expect(axiosStub.calledOnce).to.be.ok
      expect(axiosStub.calledWith('valid_url')).to.be.ok
    })

    it('should throw if axios throws', async () => {
      const sut = new IncomeRepository()

      axiosStub.callsFake(async () => {
        return new Promise((resolve, reject) => reject(new Error()))
      })

      const result = sut.makeRequest('valid_url')
      
      await expect(result).to.eventually.be.rejectedWith(Error)

    })

    it('should return an object containing a data and a status field', async () => {
      const sut = new IncomeRepository()
      
      const axiosMockedResponse = {
        data: {},
        status: 200,
        any1: {},
        any2: {},
        any3: {}
      }

      axiosStub.callsFake(async () => {
        return new Promise(resolve => resolve(axiosMockedResponse))
      })

      const result = await sut.makeRequest('any_url')

      expect(result).to.be.deep.equal({data: {}, status: 200})
    })
  })

  describe('getConversions', () => {
    it('should call makeRequest with /convert url', async () => {
      const sut = new IncomeRepository()
      const makeRequestStub = sinon.stub(sut, 'makeRequest').callsFake( async () => {
        return new Promise(resolve => resolve({data: convertResponse, status: 200}))
      })

      await sut.getConversions()

      expect(makeRequestStub.calledWith('/convert')).to.be.ok
    })
    
    it('should return the correct list of conversions when getConversions is called', async () => {
      const sut = new IncomeRepository()

      const makeRequestStub = () => ({data: convertResponse, status: 200})
      
      sut.makeRequest = makeRequestStub

      const expected = mocks.convertResponse.results;
      const result = await repository.getConversions();
  
      expect(result).to.be.equal(expected);
    });
  })

  
});
