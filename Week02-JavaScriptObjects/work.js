var person = {
    firstName: 'Jefferson',
    lastName: 'Eagley',
    fullName: function() {
        'use strict';
        return this.firstName + ' ' + this.lastName;
    }
};

var calculator = {
    operator1: -1,
    operator2: -1,
    add: function() {
        'use strict';
        return this.operator2 + this.operator1;
    },
    subtract: function() {
        'use strict';
        return this.operator1 - this.operator2;
    }
};

calculator.multiply = function() {
    'use strict';
    return calculator.operator1 * calculator.operator2;
};

function divider(title) {
    'use strict';
    console.log('====================================');
    console.log(title);
    console.log('====================================');
}

divider('Person');

console.log(person.firstName);
console.log(person.lastName);
console.log(person.fullName());

divider('Calculator');

calculator.operator1 = person.firstName.length;
calculator.operator2 = person.lastName.length;

console.log('Operator01 = ' + calculator.operator1);
console.log('Operator02 = ' + calculator.operator2);
console.log('add = ' + calculator.add());
console.log('sub = ' + calculator.subtract());
console.log('mult = ' + calculator.multiply());
