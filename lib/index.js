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

var assert = require('assert');

var Customer = require('./customer');

/**
 * Creates a FastBill communication object that provides the access to all
 * available API services.
 * 
 * Usage example:
 * 
 *     var FastBill = require('fastbill');
 * 
 *     var fastbill = FastBill.instantiate({email: '', apikey: ''});
 * 
 *     gastbill.customer.get(...);
 * 
 * @param {object} credentials E-Mail address and the API key.
 * 
 * @returns {object}
 * 
 */
exports.instantiate = function instantiate (credentials) {

    assert.equal(typeof credentials, 'object', 'Please define the FastBill credentials');

    return {
        customer: Customer.instantiate(credentials)
    };
};