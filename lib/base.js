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

var https = require('./utils/https');
var url = require('url');

module.exports = BaseBroker;

function BaseBroker (credentials) {
    var auth = new Buffer(credentials.email + ':' + credentials.apikey)
            .toString('base64');

    this.$uri = 'https://my.fastbill.com/api/1.0/api.php';

    this.$headers = {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
    };
}

/**
 * Performs a HTTP request against the FastBill API.
 *
 * @param {object} payload The request pattern (e.g. filter, data, service, etc.)
 * @param {function} callback Error-first callback (err, parsedResultSet)
 * 
 */
BaseBroker.prototype.$request = function $request (payload, callback) {
    var options = {
        uri: this.$uri,
        headers: this.$headers,
        data: payload && JSON.stringify(payload)
    };
    
    function onResponse (err, data) {
        // TODO: To utils. Implement "intelligent guess" for response parsing
        try {
            data = JSON.parse(data).RESPONSE;
        } catch (e) {
            return callback(new Error('Unable to parse response'));
        }

        // Check if the FastBill API responds with errors
        // If so, create an error object with the first available error message.
        if (data.ERRORS) {
            return callback(new Error(data.ERRORS[0]));
        }

        callback(null, data);
    }
    
    https.post(options, onResponse);
};