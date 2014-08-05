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

var browserify = require('browserify');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var jshint = require('gulp-jshint');
var sequence = require('run-sequence');
var source = require('vinyl-source-stream');
var pkg = require('./package.json');
var paths = {};

paths.specs = [path.join(__dirname, 'specs', '*.spec.js')];
paths.sources = [path.join(__dirname, '*.js'), path.join(__dirname, 'lib', '**', '*.js')];

gulp.task('lint', function () {
    return gulp.src(paths.specs.concat(paths.sources))
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('test', function () {
    return gulp.src(paths.specs)
        .pipe(jasmine());
});

gulp.task('browserify', function () {
    return browserify({
        entries: './index.js',
        standalone: 'FastBill'
    })
        .bundle()
        .pipe(source(pkg.name + '-' + '.js'))
        .pipe(gulp.dest('./browser/'));
});

gulp.task('default', function () {
    return sequence('lint', 'test', 'browserify');
});
