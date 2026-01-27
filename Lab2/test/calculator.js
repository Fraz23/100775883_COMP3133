// test/calculator.js
const chai = require('chai');
const expect = chai.expect;

// go up one level from test/ to project root, then into app/
const calculator = require('../app/calculator');

describe('Calculator', function () {
  describe('add()', function () {
    it('PASS: add(5, 2) should return 7', function () {
      expect(calculator.add(5, 2)).to.equal(7);
    });

    it('FAIL (on purpose): add(5, 2) should NOT return 8', function () {
      expect(calculator.add(5, 2)).to.equal(8);
    });
  });

  describe('sub()', function () {
    it('PASS: sub(5, 2) should return 3', function () {
      expect(calculator.sub(5, 2)).to.equal(3);
    });

    it('FAIL (on purpose): sub(5, 2) should NOT return 5', function () {
      expect(calculator.sub(5, 2)).to.equal(5);
    });
  });

  describe('mul()', function () {
    it('PASS: mul(5, 2) should return 10', function () {
      expect(calculator.mul(5, 2)).to.equal(10);
    });

    it('FAIL (on purpose): mul(5, 2) should NOT return 12', function () {
      expect(calculator.mul(5, 2)).to.equal(12);
    });
  });

  describe('div()', function () {
    it('PASS: div(10, 2) should return 5', function () {
      expect(calculator.div(10, 2)).to.equal(5);
    });

    it('FAIL (on purpose): div(10, 2) should NOT return 2', function () {
      expect(calculator.div(10, 2)).to.equal(2);
    });
  });
});
