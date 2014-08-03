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

module.exports = {
    'customer.get': require('./customer.get/all.json'),
    'customer.get/filter': require('./customer.get/filter.json'),
    'customer.get/limit': require('./customer.get/limit.json'),
    'customer.create': require('./customer.create.json')
};