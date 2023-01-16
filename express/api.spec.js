const request = require('supertest');
const should = require('should');

const app = require('./api');

describe('GET /users는 ', () => {
  describe('성공 시 ', () => {
    it('유저 객체를 담은 배열로 응답한다.', (done) => {
      request(app)
        .get('/users')
        .end((req, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it('최대 limit 개수만큼 응답한다.', (done) => {
      request(app)
        .get('/users?limit=2')
        .end((req, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe('실패 시 ', () => {
    it('limit이 숫자형이 아니면 status 400을 응답한다.', (done) => {
      request(app).get('/users?limit=two').expect(400).end(done);
    });
  });
});
