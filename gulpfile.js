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

var path = require('path');

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sequence = require('run-sequence');
var paths = {};

paths.specs = [path.join(__dirname, 'specs')];
paths.sources = [path.join(__dirname, '*.js'), path.join(__dirname, 'lib')];

gulp.task('lint', function () {
    return gulp.src(paths.specs.concat(paths.sources))
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('default', function () {
    return sequence('lint');
});