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
var jasmine = require('gulp-jasmine');
var jshint = require('gulp-jshint');
var symlink = require('gulp-symlink');
var sequence = require('run-sequence');
var paths = {};

paths.specs = [path.join(__dirname, 'specs', '*.spec.js')];
paths.sources = [path.join(__dirname, '*.js'), path.join(__dirname, 'lib', '**', '*.js')];

gulp.task('hook', function () {
    return gulp.src('.pre-commit')
        .pipe(symlink('.git/hooks/', 'pre-commit'));    
});

gulp.task('lint', function () {
    return gulp.src(paths.specs.concat(paths.sources))
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('test', function () {
    return gulp.src(paths.specs)
        .pipe(jasmine());
});

gulp.task('default', function () {
    return sequence('lint', 'test');
});
