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

var util = require('util');

var BaseBroker = require('./base');

exports.instantiate = function instantiate (credentials) {
    return new CustomerBroker(credentials);
};

function CustomerBroker (credentials) {
    this.$namespace = 'customer.';

    BaseBroker.call(this, credentials);
}

util.inherits(CustomerBroker, BaseBroker);

/**
 * Requests the details from one or more customers.
 * When no filter is set, it returns all customers
 * 
 * If no options has been passed, the method will return all
 * available customers
 * 
 * Possible options:
 * 
 *     limit: Limits the result set
 *     offset: ResultSet offset
 *     filter: Filter parameter for restricting the result set
 * 
 * See: http://www.fastbill.com/api/en/customer.html#customer.get
 * 
 * @param {object} options Possible request options (see above)
 * @param {function} callback Error-first callback (err, customers)
 * 
 */
CustomerBroker.prototype.get = function get (options, callback) {

    function onResult (err, resultset) {
        if (err) {
            return callback(err);
        }

        callback(null, resultset.CUSTOMERS);
    }

if ('function' === typeof options) {
    callback = options;
    options = undefined;
}

options = options || {};

    this.$request({
        service: this.$namespace + 'get',
        filter: options.filter,
        limit: options.limit,
        offset: options.offset
    }, onResult);
};

/**
 * Creates a new customer
 * 
 * See: http://www.fastbill.com/api/en/customer.html#customer.create
 * 
 * @param {object} customer The customer that should be created.
 * 
 */
CustomerBroker.prototype.create = function create (customer, callback) {

    function onResult (err, resultset) {
        if (err) {
            return callback(err);
        }

        // TODO: What kind of data will be returned?
        // callback(null, resultset.CUSTOMERS);
    }

    if ('function' === typeof customer) {
        callback = customer;
        customer = undefined;
    }

    customer = customer || {};

    this.$request({
        service: this.$namespace + 'create',
        data: customer
    }, onResult);
};