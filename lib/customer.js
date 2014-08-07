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
var util = require('util');

var BaseBroker = require('./base');

exports.instantiate = function instantiate (credentials) {
    return new CustomerBroker(credentials);
};

/**
 * The customer broker which abstracts from the
 * customer services of the FastBill API.
 * 
 * @param {object} credentials The email and api key tupel.
 * 
 */
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
 * See: http://www.fastbill.com/api/en/customer.html#customer.get
 * 
 * Possible options:
 * 
 *     limit: Limits the result set
 *     offset: ResultSet offset
 *     filter: Filter parameter for restricting the result set
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

    assert.equal(typeof (options), 'object', 'argument "options" should be an object.');
    assert.equal(util.isArray(options), false, 'argument "options" should be an object.');
    assert.equal(typeof (callback), 'function');

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
 * The customer id of the newly created customer will be passed
 * to the callback function.
 * 
 * See: http://www.fastbill.com/api/en/customer.html#customer.create
 *
 * Usage example:
 * 
 *     var customer = {
 *         CUSTOMER_TYPE: 'consumer',
 *         LAST_NAME: 'König',
 *         COUNTRY_CODE: 'DE',
 *         PAYMENT_TYPE: 1,
 *         BANK_NAME: 'Postbank',
 *         BANK_CODE: 1000000,
 *         BANK_ACCOUNT_NUMBER: 9000000,
 *         BANK_ACCOUNT_OWNER: 'König',
 *         BANK_ACCOUNT_MANDATE_REFERENCE: 'DEPBXXXXXXXXXXXXXXXXXXXXXXX'
 *     };
 *
 *     fastbill.customer.create(customer, function (err, id) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *
 *         console.log(id);
 *     });
 * 
 * @param {object} customer The customer that should be created.
 * @param {function} callback Error-first callback (err, customerId)
 * 
 */
CustomerBroker.prototype.create = function create (customer, callback) {

    function onResult (err, results) {
        if (err) {
            return callback(err);
        }

        callback(null, results.CUSTOMER_ID);
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

/**
 * Updates the information of a customer.
 * 
 * See: http://www.fastbill.com/api/en/customer.html#customer.update
 * 
 * Usage example:
 * 
 *     var modification = {
 *         FIRST_NAME: 'André'
 *     };
 *
 *     fastbill.customer.update(1, modification, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 *
 * @param {number} id The id of the customer that should be updated.
 * @param {object} modification The modifications.
 * @param {function} callback Error-first callback (err)
 *
 */
CustomerBroker.prototype.update = function update (id, modification, callback) {
    
    function onResult (err) {
        if (err) {
            return callback(err);
        }

        callback(null);
    }

    assert.equal(typeof (id), 'number', 'argument \'id\' must be a number');
    assert.equal(typeof (modification), 'object', 'argument \'modification\' must be an object');
    assert.equal(typeof (callback), 'function');

    modification.CUSTOMER_ID = id;
    
    this.$request({
        service: this.$namespace + 'update',
        data: modification
    }, onResult);
};

/**
 * Deletes a customer.
 * 
 * See: http://www.fastbill.com/api/en/customer.html#customer.delete
 * 
 * Usage example:
 *
 *     fastbill.customer.delete(1, function (err) {
 *         if (err) {
 *             return console.error(err);
 *         }
 *     });
 *
 * @param {number} id The id of the customer that should be deleted.
 * @param {function} callback Error-first callback (err)
 * 
 */
CustomerBroker.prototype.delete = function del (id, callback) {
    
    function onResult (err) {
        if (err) {
            return callback(err);
        }
    
        callback(null);
    }

    if ('function' === typeof id) {
        callback = id;
        id = undefined;
    }
    
    this.$request({
        service: this.$namespace + 'delete',
        data: {CUSTOMER_ID: id}
    }, onResult);
};