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

/**
 * Comfortable wrapper around a HTTP POST request.
 * 
 * Possible options:
 * 
 *     uri: {string}
 *     headers: {object}
 *     data: {string}
 * 
 * @param {object} options Possible request options
 * @param {function} callback Error-first callback (err, responseBody)
 * 
 */
function post (options, callback) {
    var params;
    var request;
    
    options.uri = options.uri || '';

    params = url.parse(options.uri);
    params.method = 'POST';
    params.headers = options.headers;

    request = https.request(params, function onResponse (response) {
        var body = '';

        response.on('data', function onData (data) {
            body = body + data;
        });
        
        response.on('end', function onEnd () {
            callback(null, body);
        });
    });

    request.on('error', function onError (err) {
        return callback(new Error('Communication error: ' + err));
    });

    request.write(options.data);
    request.end();
}

module.exports = {
    post : post
};