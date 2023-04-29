const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;

const app = require("../index");

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
                done();
            })
            .catch(err => {
                done(err);
            })
    });
  });

  describe("POST /createOneBook", () => {
    it("should add a book", async () => {
        chai.request(app)
            .get("/createBook")
            .send({"title": "Mocha Test", "author": "Test Author", "year": 2023 })
            .then(res => {
                expect(res).to.have.status(201);
                done();
            })
            .catch(err => {
                done(err);
            })
    });
  });