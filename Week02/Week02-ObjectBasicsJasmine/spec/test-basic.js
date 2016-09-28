var myObject = require('../Source/MyObject');

describe('My Object Test Suites', function () {
    'use strict';

    describe('Object Basics with Require', function () {

        it('proves true is true', function () {
            expect(true)
                .toBe(true);
        });

        it('proves that one is smaller than two', function () {
            expect(1)
                .toBeLessThan(2);
        });

        it('proves myObject is an object', function () {
            expect(typeof myObject)
                .toBe('object');
        });

        it('shows myObject is not a function object', function () {
            var isFunction = (typeof myObject !== 'function');
            expect(isFunction)
                .toBe(true);
        });

        it('shows myObject has three methods', function () {
            var methods = [];
            for (var n in myObject) {
                if (typeof myObject[n] === 'function') {
                    methods.push(n);
                }
                console.log(n);
            }
            expect(methods.length)
                .toBe(3);
        });

        it('shows myObject has two numeric properties', function () {
            var methods = [];
            for (var n in myObject) {
                if (typeof myObject[n] === 'number') {
                    methods.push(n);
                }
            }
            expect(methods.length)
                .toBe(2);
        });

        it('shows myObject has one string property', function () {
            var strings = [];
            for (var n in myObject) {
                if (typeof myObject[n] === 'string') {
                    strings.push(n);
                }
            }
            expect(strings.length)
                .toBe(1);
        });
    });
});
