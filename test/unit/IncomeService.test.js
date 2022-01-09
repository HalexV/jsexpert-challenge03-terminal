import { describe, it, before } from 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { incomeRepositoryMock, mocks } from '../mocks/incomeRepository.mock.js';

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
      const expected = mocks.validIncome;
  
      const income = await service.generateIncomeFromString(
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
