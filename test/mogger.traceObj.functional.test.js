/** @license MIT License (c) Copyright (c) 2014 Julio Makdisse Saito */

/**
 * Mogger
 * Meld + Trace + Colorful logger
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Julio Makdisse Saito (saitodisse@gmail.com)
 * @version 0.5.0
 */


var assert      = require('assert'),
    Mogger      = require('../src/mogger'),
    fakeConsole = require('./fake-console'),
    mogger
;

describe('traceObj() Functional Tests', function(){

    var sample_obj = {
        addNumbers: function (arg1, arg2) {
            return arg1 + arg2;
        },
        justReturn: function (arg1) {
            return arg1;
        }
    };

    beforeEach(function () {
        mogger = new Mogger({
            defaultConsole: fakeConsole,
            surrogateTargets: [{ title: 'SAMPLE_OBJ', target: sample_obj }]
        });
    });

    afterEach(function () {
        fakeConsole.logRecorder = [];
        mogger.removeAllTraces();
        mogger.surrogateTargets = null;
    });

    describe('method name', function () {
        it('only method name', function () {
            mogger.traceObj({ targetTitle: 'SAMPLE_OBJ' });

            sample_obj.addNumbers();

            assert.equal(1, fakeConsole.logRecorder.length);
            assert.equal('addNumbers', fakeConsole.logRecorder[0].message);
        });

        it('two logs', function () {
            mogger.traceObj({ targetTitle: 'SAMPLE_OBJ' });

            sample_obj.addNumbers();
            sample_obj.addNumbers();

            assert.equal(2, fakeConsole.logRecorder.length);
            assert.equal('addNumbers', fakeConsole.logRecorder[0].message);
            assert.equal('addNumbers', fakeConsole.logRecorder[1].message);
        });

        it('two different logs', function () {
            mogger.traceObj({ targetTitle: 'SAMPLE_OBJ' });

            sample_obj.addNumbers();
            sample_obj.justReturn();

            assert.equal(2, fakeConsole.logRecorder.length);
            assert.equal('addNumbers', fakeConsole.logRecorder[0].message);
            assert.equal('justReturn', fakeConsole.logRecorder[1].message);
        });
    });

    describe('css', function () {
        it('only method name', function () {
            mogger.traceObj({
                targetTitle: 'SAMPLE_OBJ',
                localTargetConfig: {
                    css: 'color: red'
                }
            });

            sample_obj.addNumbers();

            assert.equal(1, fakeConsole.logRecorder.length);
            assert.equal('%caddNumbers', fakeConsole.logRecorder[0].message);
            assert.equal('color: red', fakeConsole.logRecorder[0].cssList[0]);
        });

        it('with before', function () {
            mogger.traceObj({
                localBeforeConfig: {
                    css: 'color: blue'
                },
                localTargetConfig: {
                    css: 'color: red'
                },
                before: {
                    message: 'Sample OBJ: ',
                },
                targetTitle: 'SAMPLE_OBJ',
            });

            sample_obj.addNumbers();

            assert.equal(1, fakeConsole.logRecorder.length);
            assert.equal('%cSample OBJ: %caddNumbers', fakeConsole.logRecorder[0].message);
            assert.equal('color: blue', fakeConsole.logRecorder[0].cssList[0]);
            assert.equal('color: red', fakeConsole.logRecorder[0].cssList[1]);
        });
    });

    describe('size', function () {
        it('only method name', function () {
            mogger.traceObj({
                targetTitle: 'SAMPLE_OBJ',
                localTargetConfig: {
                    size: 15
                }
            });

            sample_obj.addNumbers();

            assert.equal(1, fakeConsole.logRecorder.length);
            assert.equal('addNumbers     ', fakeConsole.logRecorder[0].message);
        });

        it('with before', function () {
            mogger.traceObj({
                localBeforeConfig: {
                    size: 15
                },
                localTargetConfig: {
                    size: 15
                },
                before: {
                    message: 'Sample OBJ: '
                },
                targetTitle: 'SAMPLE_OBJ',
            });

            sample_obj.addNumbers();

            assert.equal(1, fakeConsole.logRecorder.length);
            assert.equal('Sample OBJ:    addNumbers     ', fakeConsole.logRecorder[0].message);
        });
    });

    describe('before, the title', function () {
        it('before shows title before method name', function () {
            mogger.traceObj({
                before: { message: 'Sample OBJ: ' },
                targetTitle: 'SAMPLE_OBJ'
            });

            sample_obj.addNumbers();

            assert.equal(1, fakeConsole.logRecorder.length);
            assert.equal('Sample OBJ: addNumbers', fakeConsole.logRecorder[0].message);
        });
    });



});
