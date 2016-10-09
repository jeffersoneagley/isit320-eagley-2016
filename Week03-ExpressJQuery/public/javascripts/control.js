var MyObject = (function() {
    'use strict';

    // constructor
    function MyObject() {
        $('#sendString')
            .click(showString);

        $('#getItems')
            .click(showItems);

        $('#getMarie')
            .click(showMarie);
    }

    function showString() {
        $('#stringHolder')
            .html('Send string was clicked');
    }

    function showItems() {
        $('#myList')
            .append('<li>' + 'item01' + '</li>');
        $('#myList')
            .append('<li>' + 'item02' + '</li>');
        $('#myList')
            .append('<li>' + 'item03' + '</li>');
    }

    function showMarie() {
        var marie = {
            'firstName': 'Marie',
            'lastName': 'Curie',
            'city': 'Paris',
            'country': 'France'
        };
        for (var property in marie) {
            if (marie.hasOwnProperty(property)) {
                $('#myList')
                    .append('<li>' + marie[property] + '</li>');
            }
        }
    }

    MyObject.prototype.readyCalled = function() {
        $('#readyCalled')
            .html('Ready was called and myObjected created');
    };

    return MyObject;
}());

$(document)
    .ready(function() {
        'use strict';
        var myObject = new MyObject();
        myObject.readyCalled();
    });
