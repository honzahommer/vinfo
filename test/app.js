const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('VIN info', function () {
    describe('/GET', function () {
        it('it should GET empty VIN info', function (done) {
            chai.request(app)
                .get('/')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });
    });

    describe('/GET invalid', function () {
        it('it should GET invalid VIN info', function (done) {
            chai.request(app)
                .get('/invalid')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });
    });

    describe('/GET 11111111111111111', function () {
        it('it should GET 11111111111111111 VIN info', function (done) {
            chai.request(app)
                .get('/11111111111111111')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('continent').eql('North America');
                    done();
                });
        });
    });

    describe('/GET 11111111111111111/year', function () {
        it('it should GET 11111111111111111 VIN year', function (done) {
            chai.request(app)
                .get('/11111111111111111/year')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.text.should.eql('2001');
                    done();
                });
        });
    });

    describe('/GET 11111111111111111/undefined', function () {
        it('it should GET 11111111111111111 VIN undefined', function (done) {
            chai.request(app)
                .get('/11111111111111111/undefined')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });
    });
});
