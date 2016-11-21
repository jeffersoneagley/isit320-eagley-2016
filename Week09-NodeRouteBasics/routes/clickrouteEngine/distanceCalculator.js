module.exports = {
    getFeetFromMiles: function(numberOfMiles) {
        'use strict';
        numberOfMiles = numberOfMiles || 1;
        return {
            'feet': numberOfMiles * 5280,
            'miles': numberOfMiles
        };
    },

    getFeetInOneMile: function() {
        'use strict';
        return this.getFeetFromMiles(1);
    },

    getCircumferenceFromRadius: function(radius) {
        'use strict';
        return 2 * radius * Math.PI;
    }
};
