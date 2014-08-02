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

/* global: ,describe,it,expect,beforeEach,afterEach */

var mock = require('./mock/');
var FastBill = require('../');

describe('The "CustomerBroker"', function () {
    
    var fastbill = FastBill.instantiate({});

    mock.manipulateEndpoint(fastbill);

    beforeEach(mock.start.bind(mock));
    afterEach(mock.destroy.bind(mock));

    it('should be able to get all customers', function (done) {
        fastbill.customer.get(function (err, customers) {
            expect(err).toBeNull();

            expect(customers).toBeDefined();
            expect(customers.length).toBe(2);

            done();
        });
    });

    it('should be able to get one customer by filter', function (done) {
        var options = {
            filter: {
                'CUSTOMER_NUMBER': 'bar'
            }
        };

        fastbill.customer.get(options, function (err, customers) {
            expect(err).toBeNull();

            expect(customers).toBeDefined();
            expect(customers.length).toBe(1);
            expect(customers[0].CUSTOMER_NUMBER).toBe(options.filter.CUSTOMER_NUMBER);

            done();
        });
    });
});