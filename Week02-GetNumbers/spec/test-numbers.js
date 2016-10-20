describe('GetNumbers Jasmine intro tests', function() {
    'use strict';

    var getNumbers = require('../Source/GetNumber');

    it('proves true is true', function() {
        expect(true)
            .toBe(true);
    });

    it('proves getNumbers is an object', function() {
        expect(typeof getNumbers)
            .toBe('object');
    });

    it('shows getNumbers has nine methods', function() {
        var methods = [];
        for (var n in getNumbers) {
            if (typeof getNumbers[n] === 'function') {
                methods.push(n);
            }
        }
        expect(methods.length)
            .toBe(9);
    });

    it('shows getOne returns one', function() {
        expect(getNumbers.getOne())
            .toBe(1);
    });

    it('shows getTwo returns two', function() {
        expect(getNumbers.getTwo())
            .toBe(2);
    });

    it('shows getThree returns three', function() {
        expect(getNumbers.getThree())
            .toBe(3);
    });

    it('shows getFour returns four', function() {
        expect(getNumbers.getFour())
            .toBe(4);
    });

    it('shows getFive returns five', function() {
        expect(getNumbers.getFive())
            .toBe(5);
    });

    it('shows getSix returns six', function() {
        expect(getNumbers.getSix())
            .toBe(6);
    });

    it('shows getSeven returns seven', function() {
        expect(getNumbers.getSeven())
            .toBe(7);
    });

    it('shows getEight returns eight', function() {
        expect(getNumbers.getEight())
            .toBe(8);
    });

    it('shows getNine returns nine', function() {
        expect(getNumbers.getNine())
            .toBe(9);
    });

});
