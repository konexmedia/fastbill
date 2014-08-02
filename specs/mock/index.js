/*
 * fastbill
 *
 * Copyright(c) 2014 konexmedia <info@konexmedia.com>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@konexmedia.com>
 *
 */

'use strict';

var mocky = require('./mocky');
var response = require('./response');

var PORT = 9000;
var api;

exports.start = function start () {

    api = mocky(PORT);

    //
    // Service: customer.get
    //
    api.post('/')
        .sent({service: 'customer.get'})
        .reply(200, response['customer.get']);

    api.post('/')
        .sent({service: 'customer.get', filter: {CUSTOMER_NUMBER: 'bar'}})
        .reply(200, response['customer.get-filter']);
};

/**
 * Takes the FastBill communication object and manipulates the API URI in order
 * to communicate with the mocked API.
 * 
 * @param {object} fastbill Our FastBill API communication object.
 * 
 */
exports.manipulateEndpoint = function manipulateEndpoint (fastbill) {
    var service;

    for (service in fastbill) {
        if (fastbill.hasOwnProperty(service)) {
            fastbill[service].$uri = 'http://localhost:' + PORT;
        }
    }
};

/**
 * Destroys the mocked API.
 * 
 */
exports.destroy = function destroy () {
    api.destroy();
};