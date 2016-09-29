var person = {
    firstName: "George",
    lastName: "Washington",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}

var calculator = {
    operator1: -1,
    operator2: -1,
    add: function () {
        return this.operator2 + this.operator1;
    },
    subtract: function () {
        return this.operator1 - this.operator2;
    }
}

calculator.multiply = function () {
    return calculator.operator1 * calculator.operator2;
}

function divider(title) {
    console.log("====================================");
    console.log(title);
    console.log("====================================");
}

divider("George Washington");

console.log(person.firstName);
console.log(person.lastName);
console.log(person.fullName());

divider("Calculator");

calculator.operator1 = person.firstName.length;
calculator.operator2 = person.lastName.length;

console.log("Operator01 = " + calculator.operator1);
console.log("Operator02 = " + calculator.operator2);
console.log("add = " + calculator.add());
console.log("sub = " + calculator.subtract());
console.log("mult = " + calculator.multiply());
