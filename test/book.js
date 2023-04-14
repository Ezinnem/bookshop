//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');

let config = require('config');
let options = { useNewUrlParser: true, useUnifiedTopology: true }

//db connection      
mongoose.connect(config.testDBHost, options).then(() => {
    console.log('test Database connected..')
})

let Book = require('../models/bookmodel');
const bookController = require('../controllers/bookController');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
    beforeEach((done) => { //Before each test we empty the database
        bookController.deleteAllBooks({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/getAllBooks', bookController.getAllBooks)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});