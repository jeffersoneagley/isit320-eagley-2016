//var nano = require('nano')('http://localhost:5984');
var nano = require('nano')('http://10.0.2.5:5984');

var docName = 'bigNames';
var dbName = 'bc_data';

var readIt = function () {
    var prog = nano.db.use(dbName);
    prog.get(docName, {
        revs_info: true
    }, function (err, body) {
        if (!err)
            console.log(body);
    });
}

function insert() {
    nano.db.create(dbName);
    var prog = nano.db.use(dbName);

    prog.insert({
        'firstName': 'Yuwen',
        'lastName': 'Weng'
    }, docName, function (err, body) {
        if (!err)
            console.log(body);
        readIt();
    });
}


function add() {
    //nano.db.create(dbName);
    var prog = nano.db.use(dbName);

    prog.insert({
            "doc": [{
                'firstName': 'Yuwen',
                'lastName': 'Weng'
            }, {
                'firstName': 'Jefferson',
                'lastName': 'Eagley'
            }]
        }, docName,
        function (err, body) {
            if (!err)
                console.log(body);
            readIt();
        });
}

add();
//insert();
// readIt();
