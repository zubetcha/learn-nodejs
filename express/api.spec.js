const app = require('./api');
const request = require('supertest');

describe('GET /users는 ', () => {
  it('...', (done) => {
    request(app)
      .get('/users')
      .end((req, res) => {
        console.log(res.body);
        done();
      });
  });
});
