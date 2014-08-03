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

var express = require('express');
var bodyparser = require('body-parser');
var enableDestroy = require('server-destroy');

/**
 * Creates an instance of the Mocky API server.
 * 
 * @param {number} port
 * 
 * @returns {object}
 * 
 */
module.exports = function instantiate (port) {
    return new Mocky(port);
};

/**
 * Little API mock server for mocking the FastBill API.
 * 
 */
function Mocky (port) {
    var self = this;

    this.$router = express();
    
    this.$rules = {
        post: {}
    };

    this.$router.use(bodyparser.json());

    this.$router.use('*', function (req, res) {
        var rules = self.$rules[req.method.toLowerCase()][req.originalUrl];
        var body = JSON.stringify(req.body);

        if (rules) {
            rules.forEach(function (rule) {
                if (rule.body === body) {
                    res.status(rule.status).json(rule.response);
                }
            });
        }
    });
    
    this.$server = this.$router.listen(port);
    enableDestroy(this.$server);
}

/**
 * Destroys the server.
 * 
 */
Mocky.prototype.destroy = function destroy () {
    this.$server.destroy();
};

/**
 * Registers a HTTP POST rule.
 * 
 * @param {string} uri The uri that should be mocked.
 * 
 * @returns {object} Rule instance for defining the mocking criteria.
 * 
 */
Mocky.prototype.post = function post (uri) {
    var rule = new Rule();

    if (!this.$rules.post[uri]) {
        this.$rules.post[uri] = [];
    }
    
    this.$rules.post[uri].push(rule);
    
    return rule;
};

/**
 * A mocking rule.
 * 
 * The main decision point of the rule is the HTTP request body. This body
 * definition will be compared with the actual send body. If both are the same
 * Mocky will respond with the defined status and response body.
 *
 */
function Rule () {
    this.body;
    this.status;
    this.response;
}

/**
 * The "sent rule". When the given body hits Mocky at the registered URI, then
 * it will respond with the defined status and response body (see `reply`).
 * 
 * @param {object} regBody Hashmap of the request body object.
 *
 */
Rule.prototype.sent = function sent (reqBody) {
    this.body = JSON.stringify(reqBody);

    return this;
};

/**
 * The status and response with which Mocky responds when the rule hits.
 * 
 * @param {number} status The HTTP response code
 * @param {object} response The response body object.
 *
 */
Rule.prototype.reply = function reply (status, response) {
    this.status = status;
    this.response = response;
    
    return this;
};