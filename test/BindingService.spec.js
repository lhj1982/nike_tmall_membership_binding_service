'use strict';

var AWS = require('aws-sdk-mock');
const assert = require('assert');
const expect = require( 'chai' ).expect;
const testingAggregate = require( '../functions/BindingService/index' ).handler;

describe('BindingService tests', function () {
  afterEach(function (done) {
    AWS.restore('DynamoDB.DocumentClient');
    done();
  });

  it('1) successfully invoke bindingService', function(done){
    AWS.mock('DynamoDB.DocumentClient', 'get', function(params, callback){
      callback(null, {});
    });

    var event = {};
    var context = {};
    var callback = (ctx, data) => {
      expect(data).to.be.empty;
      done();
    };
    testingAggregate(event, context, callback);
  });
});