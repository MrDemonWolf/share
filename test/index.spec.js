/* eslint-disable no-undef */
const supertest = require('supertest');
const assert = require('assert');
const app = require('../src/index');

describe('GET /', () => {
  it('it should has status code 200', done => {
    supertest(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('GET /login', () => {
  it('it should has status code 200', done => {
    supertest(app)
      .get('/login')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

describe('GET /signup', () => {
  it('it should has status code 200', done => {
    supertest(app)
      .get('/signup')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});

// describe('POST /login', () => {
//   it('it should has status code 200', done => {
//     supertest(app)
//       .post('/login')
//       .expect(200)
//       .end((err, res) => {
//         if (err) done(err);
//         done();
//       });
//   });
// });