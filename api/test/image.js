//18 sept 2016

process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var Image = require("../models/image");

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Images', ()=>{
  beforeEach((done=>{
    Image.remove({},(err)=>{
      done();
    })
  }))
});

describe('/GET image', ()=>{
  it('it should GET all the images', (done)=>
    chai.request(server)
      .get('api/images')
      .end((err,res)=> {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
)
});
