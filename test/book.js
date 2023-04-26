
require("dotenv").config();
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