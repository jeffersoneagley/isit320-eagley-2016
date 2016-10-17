define(['jquery'], function(jquery) {
    'use strict';

    var elf = {};
    elf.run = {};

    elf.ClickEvents = (function() {
        var listItem = $('.listItem');
        var intro = $('#intro');

        function ClickEvents() {
            $(intro)
                .html('ClickEvents is loaded. Click the three items seen below.');
            $(intro)
                .addClass('blue');
            $(listItem)
                .click(listClick);
        }

        var listClick = function(event) {
            var clickText = event.target.innerHTML;
            var prompt = 'You clicked: ';
            $(intro)
                .html(prompt + clickText);
            $.getJSON('/' + clickText,
                function(DATA_FROM_SERVER, err) {
                    console.log(err);
                    //console.log(DATA_FROM_SERVER);
                    if (err == 'success') {
                        console.log(DATA_FROM_SERVER);
                        $('#result')
                            .html(DATA_FROM_SERVER.result);
                        $('#route')
                            .html(DATA_FROM_SERVER.route);
                        $('#message')
                            .html(DATA_FROM_SERVER.message);
                    } else {
                        $('#message')
                            .html(err);
                    }
                });
        };

        return ClickEvents;

    }());

    return elf.ClickEvents;

});
