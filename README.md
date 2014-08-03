# fastbill [![Build Status](https://travis-ci.org/konexmedia/fastbill.svg?branch=master)](https://travis-ci.org/konexmedia/fastbill)

A client implementation for communicating with the [FastBill](http://fastbill.com) [API](http://www.fastbill.com/api).

## Installation

    npm install --save fastbill

## Quick Start

Using this client is easy. All you need is an FastBill account and your personal API key. You don't have to register the key manually, it is there. Check your settings page (Settings -> Account).

```javascript
'use strict';

var FastBill = require('fastbill');

var api = FastBill.instantiate({
    email: 'your.email@host.tld',
    apikey: 'your-long-api-key'
});
```

You will have access to the API services after instantiating the communication object.

## Services

FastBill provides several services for interacting with the data in your account. This module provides a clean abstraction from interacting with the API in a raw fashion. The following part describes how to use the different parts of this client.

 - [Customer](#customer)

### Customer

Methods for accessing, creating, updating and deleting your customers.

 - [get](#getoptions-callback)
 - [create](#createcustomer-callback)
 - [update](#updateid-modification-callback)
 - [delete](#deleteid-callback)

#### get(options, callback)

Requests the details from one or more customers. When no filter is set, it returns all customers ([API doc](http://www.fastbill.com/api/en/customer.html#customer.get))

 - `options` An object for controlling the result set
    - `limit` Limits the result set
    - `offset` Result set offset
    - `filter` Filter params for restricting the result set
 - `callback` Error-first style callback

##### Usage example

```javascript
api.consumer.get(function (err, consumers) {
    if (err) {
        return console.error(err);
    }
    
    console.log(consumers);
});
```

#### create(customer, callback)

Creates a new customer ([API doc](http://www.fastbill.com/api/en/customer.html#customer.create))

 - `customer` An object which describes the customer that should be created. See the ([API doc](http://www.fastbill.com/api/en/customer.html#customer.create)) in order to learn the attributes that should be used.
 - `callback` Error-first style callback

##### Usage example

```javascript
var customer = {
    CUSTOMER_TYPE: 'consumer',
    LAST_NAME: 'König',
    COUNTRY_CODE: 'DE',
    PAYMENT_TYPE: 1,
    BANK_NAME: 'Postbank',
    BANK_CODE: 1000000,
    BANK_ACCOUNT_NUMBER: 9000000,
    BANK_ACCOUNT_OWNER: 'König',
    BANK_ACCOUNT_MANDATE_REFERENCE: 'DEPBXXXXXXX'
};

api.consumer.create(customer, function (err, id) {
    if (err) {
        return console.error(err);
    }
    
    console.log('Created customer with id %s', id);
});
```

#### update(id, modification, callback)

Updates the information of a customer ([API doc](http://www.fastbill.com/api/en/customer.html#customer.update)).

- `id` The id of the customer which should be altered.
- `modification` The changed customer properties
- `callback` Error-first style callback

##### Usage example

```javascript
var modification = {
    FIRST_NAME: 'André'
};

api.customer.update(1, modification, function (err) {
    if (err) {
        return console.error(err);
    }
    
    console.log('Updated customer');
});
```

#### delete(id, callback)

Deletes a customer ([API doc](http://www.fastbill.com/api/en/customer.html#customer.delete)).

- `id` The id of the customer which should be deleted.
- `callback` Error-first style callback

##### Usage example

```javascript
api.customer.delete(1, function (err) {
    if (err) {
        return console.error(err);
    }
    
    console.log('Deleted customer.');
});
```
## License

The MIT License (MIT) Copyright (c) 2014 konexmedia

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.