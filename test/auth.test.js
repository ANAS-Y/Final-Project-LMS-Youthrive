const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Your app.js file
const should = chai.should();

chai.use(chaiHttp);

describe('Auth', () => {
  it('should register a user', (done) => {
    chai.request(app)
      .post('/auth/register')
      .send({ username: 'testuser', email: 'testuser@example.com', password: 'password', role: 'user' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User registered successfully');
        done();
      });
  });

  it('should login a user', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send({ email: 'testuser@example.com', password: 'password' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
});
