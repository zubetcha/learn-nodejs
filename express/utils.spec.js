const utils = require('./utils');
const assert = require('assert');
const should = require('should');

// capitalize라는 모듈의 기능을 테스트하는 단위 테스트
describe('utils.js 모듈의 capitalize 함수는 ', () => {
  it('문자열의 첫 번째 문자를 대문자로 변환한다.', () => {
    const result = utils.capitalize('hello');

    // assert.equal(result, 'Hello');
    result.should.be.equal('Hello');
  });
});
