import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index.js';
const { expect } = chai;
chai.use(chaiHttp);

describe('User Service', () => {
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await chai.request(app)
        .post('/api/users')
        .send({
          email: 'userTest@example.com',
          pseudo: 'testUser',
          password: 'testPassword',
          role: 'user',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.email).to.equal('userTest@example.com');
    });
  });
});