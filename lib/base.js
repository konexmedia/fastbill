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

var https = require('https');
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
 * Possible options:
 * 
 *     
 * 
 */
BaseBroker.prototype.$request = function $request (options, callback) {
    var params = url.parse(this.$uri);
    var request;

    params.method = 'POST';
    params.headers = this.$headers;

    function handleResponse (data) {
        try {
            data = JSON.parse(data).RESPONSE;
        } catch (e) {
            return callback(new Error('Unable to parse response'));
        }

        if (data.ERRORS) {
            return callback(new Error(data.ERRORS[0]));
        }
        
        callback(null, data);
    }

    // TODO: Move to utilities
    request = https.request(params, function onResponse (response) {
        var body = '';

        response.on('data', function onData (data) {
            body = body + data;
        });
        
        response.on('end', function onEnd () {
            handleResponse(body);
        });
    });

    request.on('error', function onError (err) {
        return callback(new Error('Communication error: ' + err));
    })

    request.write(JSON.stringify(options))
    request.end();
};