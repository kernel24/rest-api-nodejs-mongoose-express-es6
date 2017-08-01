import request from 'supertest'
import { expect } from 'chai'
import app from '../app';

describe('Taskworld Node Server', () => {
    it('should return 200', done => {
        request(app)
          .get('/')
          .expect(200)
          .end((err, res) => {
              if (err) {
                done(err)
                return
              }
              done()
        });
    });
});
