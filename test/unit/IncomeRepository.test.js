import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon'
import { incomeRepositoryMock, mocks } from '../mocks/incomeRepository.mock.js';
import axios from 'axios'
import IncomeRepository from '../../src/repository/IncomeRepository.js';

const axiosStub = sinon.stub(axios, 'get').callsFake( async () => {
  return new Promise(resolve => resolve({data: 'ok'}))
} )

describe('IncomeRepository Suite Tests', () => {
  let repository = {};

  before(() => {
    repository = incomeRepositoryMock;
  });

  it('should call axios with the url passed to makeRequest', async () => {
    const sut = new IncomeRepository()
    await sut.makeRequest('valid_url')
    
    expect(axiosStub.calledOnce).to.be.ok
    expect(axiosStub.calledWith('valid_url')).to.be.ok
  })

  it('should return the correct list of conversions when getConversions is called', async () => {
    const expected = mocks.convertResponse.results;
    const result = await repository.getConversions();

    expect(result).to.be.equal(expected);
  });
});
