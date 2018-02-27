'use strict';
const AWS = require('aws-sdk');

module.exports.handler = (event, context, callback) => {
    const dynamoClient = new AWS.DynamoDB.DocumentClient();
    // console.log('Received event:', JSON.stringify(event, null, 2));
    const params = {
      TableName: process.env.MembershipBindingTable,
      Key: {
        encryptedNick: '1234',
      }
    };
    dynamoClient.get(params, (err, data) => {
      callback(err, data);
    });
};
