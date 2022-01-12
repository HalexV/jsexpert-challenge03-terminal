import { describe, it, before } from 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { incomeRepositoryMock, mocks } from '../mocks/incomeRepository.mock.js';

import convertResponse from '../mocks/convert-response.js';

import IncomeService from '../../src/service/IncomeService.js';

chai.use(chaiAsPromised)

const expect = chai.expect

describe('IncomeService Suite Tests', () => {
  let service = {};
  let repository = {};

  before(() => {
    repository = incomeRepositoryMock;
    service = new IncomeService({ incomeRepository: repository });
  });

  describe('generateIncomeFromString', () => {

    it('should throw when incomeString is not a string', async () => {
      const sut = new IncomeService({incomeRepository: {}})

      const result = sut.generateIncomeFromString(1, 'any')

      await expect(result).to.be.eventually.rejectedWith(Error, 'IncomeString must be a string')
    })

    it('should throw when delimiter is not a string', async () => {
      const sut = new IncomeService({incomeRepository: {}})

      const result = sut.generateIncomeFromString('any', 1)

      await expect(result).to.be.eventually.rejectedWith(Error, 'Delimiter must be a string')
    })

    it('should successfully return an income instance given a correct string', async () => {
      const sut = new IncomeService({
        incomeRepository: {
          getConversions: () => convertResponse.results
        }
      })
      
      const USD = 0.174058
      const EUR = 0.154342
      const GBP = 0.131224
      
      const expected = {
        position: 'Senior Javascript Engineer',
        expectation: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(15000),
        conversion01: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(15000 * USD),
        conversion02: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(15000 * EUR),
        conversion03: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(15000 * GBP),
      };
  
      const {id, ...income} = await sut.generateIncomeFromString(
        'Senior Javascript Engineer; 15000'
      );
  
      expect(income).to.be.deep.equal(expected);
    });
  
    it('should return an error when generating an income instance from empty string', async () => {
      const expectedErrorMessage =
        'Position is a required field. Please make sure you are providing a position.';
  
      let errorMessage = null;
  
      try {
        await service.generateIncomeFromString('');
      } catch (error) {
        errorMessage = error.message;
      }
      expect(errorMessage).to.be.equal(expectedErrorMessage);
    });

    it('should throw when incomeString does not contain a valid delimiter', async () => {
      const sut = new IncomeService({incomeRepository: {}})

      const result = sut.generateIncomeFromString('any,any', '|')
      const result1 = sut.generateIncomeFromString('any')

      await expect(result).to.be.eventually.rejectedWith(Error, 'IncomeString must contain a valid delimiter')
      await expect(result1).to.be.eventually.rejectedWith(Error, 'IncomeString must contain a valid delimiter')
    })

    it('should throw when incomeString does not contain a position', async () => {
      const sut = new IncomeService({incomeRepository: {}})

      const result = sut.generateIncomeFromString(';1')

      await expect(result).to.be.eventually.rejectedWith(Error, 'Position is a required field. Please make sure you are providing a position.')
    })
  
    it('should return an error when generating an income instance from invalid string', async () => {
      const expectedErrorMessage =
        'A valid Expectation is required. Please note that only numbers are allowed.';
  
      let errorMessage = null;
  
      try {
        await service.generateIncomeFromString('a;12b');
      } catch (error) {
        errorMessage = error.message;
      }
      expect(errorMessage).to.be.equal(expectedErrorMessage);

      errorMessage = null;

      try {
        await service.generateIncomeFromString('a;');
      } catch (error) {
        errorMessage = error.message;
      }
      expect(errorMessage).to.be.equal(expectedErrorMessage);
    });

    

  })

  
});
