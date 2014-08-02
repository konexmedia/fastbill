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

exports.instantiate = function instantiate (credentials) {
    return new CustomerBroker(credentials);
};

function CustomerBroker (credentials) {
    
}