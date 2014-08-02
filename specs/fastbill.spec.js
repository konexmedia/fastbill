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

/* global: ,describe,it,expect */

var FastBill = require('../');

describe('The "FastBill" communication object', function () {
    
    var credentials = {email: '', apikey: ''};
    
    it('should be instantiable', function () {
        var fastbill = FastBill.instantiate(credentials);
        
        expect(fastbill).toBeDefined();
    });
    
    it('should throw an error when no credentials are available', function () {
        var fastbill;

        try {
            fastbill = FastBill.instantiate();
        } catch (e) {
            expect(e).toBeDefined();
        }
    });
    
    it('should have a "Customer" broker', function () {
        var fastbill = FastBill.instantiate(credentials);

        expect(fastbill.customer).toBeDefined();
        expect(fastbill.customer.constructor.name).toBe('CustomerBroker');
    });
});