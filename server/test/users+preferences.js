import request from 'supertest'
import { expect } from 'chai'
import app from '../app';

var user_id
var cookies

describe('POST /users', () => {
  it('should respond with creating user', (done) => {
    request(app)
      .post('/users')
      .send({
        user_name: 'jaekyun jung',
        location: 'korea',
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
          return
        }

        expect(res.body).has.all.keys([
          'message','user_id'
        ])
        expect(res.body.message).to.equal('User successfully added!')
        user_id = res.body.user_id
        done()
      })
  })
})

describe('GET /users/:user_id', () => {
  it('should respond with specific user', (done) => {
    request(app)
      .get('/users/'+user_id)
      .expect(200)
      .end((err, res, req) => {
        if (err) {
          done(err)
          return
        }
        expect(res.body).has.all.keys([
          '__v', '_id', 'user_id','user_name','location'
        ])
        expect(res.body.user_id).to.equal(user_id)
        expect(res.body.user_name).to.equal('jaekyun jung')
        expect(res.body.location).to.equal('korea')

        cookies = res.headers['set-cookie'].pop().split(';')[0]
        done()
      })
  })
})

describe('POST /prefrences/', () => {
  it('should respond with creating preferences', (done) => {
    var req = request(app).post('/preferences/')
    req.cookies = cookies
    req
      .send({
        "content": {
          "category_lists": 0
        },
        "privacy": {
          "profile_visibility": 0,
          "messages": 1
        },
        "localization": {
          "language": "jp",
          "time_zone": "Asia/Tokyo",
          "currency": "JPY"
        }
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
          return
        }

        expect(res.body).has.all.keys([
          'message'
        ])
        expect(res.body.message).to.equal('Preferences successfully added!')
        done()
      })
  })
})

describe('PUT /prefrences/', () => {
  it('should respond with creating preferences', (done) => {
    var req = request(app).put('/preferences/')
    req.cookies = cookies
    req
      .send({
        "content": {
          "category_lists": 1
        },
        "privacy": {
          "profile_visibility": 1,
          "messages": 1
        },
        "localization": {
          "language": "ko",
          "time_zone": "Asia/Seoul",
          "currency": "KRW"
        }
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
          return
        }

        expect(res.body).has.all.keys([
          'message'
        ])
        expect(res.body.message).to.equal('Preferences successfully updated!')
        done()
      })
  })
})

describe('GET /preferences/', () => {
  it('should respond with specific preferences along with user', (done) => {
    var req = request(app).get('/preferences/')
    req.cookies = cookies
    req
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
          return
        }
        expect(res.body).has.all.keys([
          '_id','user','__v','content','privacy','localization'
        ])
        expect(res.body.content.category_lists).to.equal(1)
        expect(res.body.privacy.profile_visibility).to.equal(1)
        expect(res.body.privacy.messages).to.equal(1)

        expect(res.body.localization.language).to.equal('ko')
        expect(res.body.localization.time_zone).to.equal('Asia/Seoul')
        expect(res.body.localization.currency).to.equal('KRW')
        done()
      })
  })
})

describe('DELETE /preferences/', () => {
  it('should respond with removing preferences about user', (done) => {
    var req = request(app).delete('/preferences/')
    req.cookies = cookies
    req
      .expect(204)
      .end((err, res) => {
        if (err) {
          done(err)
          return
        }
        done()
      })
  })
})



describe('DELETE /users', () => {
  it('should respond with removing user', (done) => {
    var req = request(app).delete('/users/')
    req.cookies = cookies
    req
      .expect(204)
      .end((err, res) => {
        if (err) {
          done(err)
          return
        }
        done()
      })
  })
})
