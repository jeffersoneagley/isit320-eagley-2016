define([], function() {
    'use strict';
    ///requires showpagefragment, and can optionally accept a jquery selector
    return function(fishShowPageFragment, sourceQuery) {
        var buttonJqueryList;
        if (sourceQuery !== undefined) {

            buttonJqueryList = $(sourceQuery)
                .find('[fishroute]');
        } else {

            buttonJqueryList = $('[fishroute]');
        }
        buttonJqueryList.click(function(event) {
            event.preventDefault();
        });
        buttonJqueryList
            .unbind('click')
            .click(fishShowPageFragment.ClickHandler);
        console.log(buttonJqueryList);
    };

});
