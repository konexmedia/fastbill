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

    it('custom.get: should be able to get all customers', function (done) {
        fastbill.customer.get(function (err, customers) {
            expect(err).toBeNull();

            expect(customers).toBeDefined();
            expect(customers.length).toBe(2);

            done();
        });
    });

    it('custom.get: should be able to get one customer by filter', function (done) {
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
    
    it('custom.get: should be able to limit the return values', function (done) {
        var options = {
            limit: 1
        };
        
        fastbill.customer.get(options, function (err, customers) {
            expect(err).toBeNull();

            expect(customers).toBeDefined();
            expect(customers.length).toBe(1);

            done();
        });
    });
    
    it('custom.create: should be able to create a new customer', function (done) {
       var customer = {
           CUSTOMER_TYPE: 'consumer',
           LAST_NAME: 'König'
       };
       
       fastbill.customer.create(customer, function (err, id) {
           expect(err).toBeNull();

           expect(id).toBeDefined();
           expect(id).toBe(1);

           done();
       });
    });
});