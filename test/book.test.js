require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");

let Book = require('../models/bookmodel');

chai.use(chaiHttp);

const expect = chai.expect;

const app = require("../index");
let should = chai.should();

before(function (done) {
    this.timeout(5000);
    setTimeout(done, 1000);
});


before(function (done) {
    this.timeout(5000);
    setTimeout(done, 1000);
});

describe("GET the / page", () => {

    it("Gets the welcome page", (done) => {
        chai.request(app)
            .get("/")
            .send()
            .then(res => {
                expect(res).to.have.status(404);
                done();
            })
            .catch(err => {
                done(err);
            })
    });
});

describe("GET /getAllBooks", () => {
    it("should return all books", async () => {
        chai.request(app)
            .get("/getAllBooks")
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).body.should.be.a('array');
                done();
            })
            .catch(err => {
                done(err);
            })
    });
});

describe("POST /createOneBook", () => {
    it("should add a book", async () => {
        let sampleBook = { "title": "Mocha Test", "author": "Test Author", "year": 2023 };
        chai.request(app)
            .post("/createBook")
            .send(sampleBook)
            .then(res => {
                expect(res).to.status(201);
                expect(res).body.should.be.a('object');
                done();
            })
            .catch(err => {
                done(err);
            })
    });
});

describe('GET/:id book', () => {
    it("should Get a book by the given id", async () => {
        let sampleBook = new Book({ "title": "Mocha Test", "author": "Test Author", "year": 2023 });
        sampleBook.save((err, book) => {
            chai.request(app)
                .get("/book/" + sampleBook.id)
                .send(sampleBook)
                .then(res => {
                    expect(res).to.status(201);
                    expect(res).body.should.be.a('object');
                    done();
                })
                .catch(err => {
                    done(err);
                })
        });
    });
});

describe('PUT/:ID book', () => {
    it('it should UPDATE a book with the unique id', async () => {
        let sampleBook = new Book({ "title": "Mocha Test", "author": "Test Author", "year": 2023 });
        sampleBook.save((err, book) => {
            chai.request(app)
                .put("/book/" + sampleBook.id)
                .send({ "title": "New updated Title" })
                .then(res => {
                    expect(res).to.status(200);
                    expect(res).body.should.be.a('object');
                    expect(res).body.should.have.property('message').eql('Success');
                    expect(res).body.should.have.property('year').eql('2023');
                    done();
                })
                .catch(err => {
                    done(err);
                })
        });
    });
});