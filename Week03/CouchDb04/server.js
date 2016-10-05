var nano = require('nano')('http://10.0.2.5:5984');
var inquirer = require("inquirer");

var dbName = 'bc_data';
var RASPBERRY_PI = "raspberry pi";
var ARDUINO = "arduino";
var BEAGLEBONE = "beaglebone";


var readIt = function (docName) {
    var prog = nano.db.use(dbName);
    prog.get(docName, {
        revs_info: true
    }, function (err, body) {
        if (!err)
            console.log(body);
    });
};

function insert(data) {
    nano.db.create(dbName);
    var prog = nano.db.use(dbName);


    for (var i = 0; i < data.length; i++) {
        prog.insert(data[i], function (err, body) {
            if (!err)
                console.log(body);
            readIt();
        });
    }
}

function deleteDoc(docUniqueId) {
    var db = nano.db.use(dbName);
    db.get(docUniqueId, function (err, body) {
        if (!err) {
            var latestRev = body._rev;
            db.destroy(docUniqueId, latestRev, function (err, body, header) {
                if (!err) {
                    console.log("Successfully deleted doc", docUniqueId);
                }
            });
        }
    })
}

function coreDataInsert() {
    var data = [{
            "_id": RASPBERRY_PI,
            "item": RASPBERRY_PI,
            "urls": {
                "Amazon": "https://www.amazon.com/Raspberry-Pi-RASP-PI-3-Model-Motherboard/dp/B01CD5VC92/",
                "Home": "https://www.raspberrypi.org/",
                "Wiki:": "https://en.wikipedia.org/wiki/Raspberry_Pi"
            }
        },

        {
            "_id": ARDUINO,
            "item": ARDUINO,
            "urls": {
                "Amazon": "https://www.amazon.com/Arduino-Uno-R3-Microcontroller-A000066/dp/B008GRTSV6/",
                "Home": "https://www.arduino.cc/",
                "Wiki:": "https://en.wikipedia.org/wiki/Arduino"
            }
        }, {
            "_id": BEAGLEBONE,
            "item": BEAGLEBONE,
            "urls": {
                "Amazon": "https://www.amazon.com/Beagleboard-BBONE-BLACK-4G-BeagleBone-Rev-C/dp/B00K7EEX2U/",
                "Home": "http://beagleboard.org/bone",
                "Wiki:": "https://en.wikipedia.org/wiki/BeagleBoard#BeagleBone"
            }
        }
    ];
    console.log("Attempting to push data");
    insert(data);
}


/*******************************+
 * Views
 *******************************/

var simpleView = function (doc) {
    emit(doc._id, doc._rev)
};

var designUrls = function (doc) {
    var url, key;
    if (doc.item && doc.urls) {
        for (var urlName in doc.urls) {
            url = doc.urls[urlName];
            key = [doc.item, url];
            emit(key, url);
        }
    }
}

function createDesignDocument() {
    var data = [{
        "_id": "_design/example",
        "views": {
            "simple": {
                "map": simpleView
            },
            "urls": {
                "map": designUrls
            }
        },
    }];
    insert(data);
}

function showView(designDoc, view) {
    var nanoDb = nano.db.use(dbName);
    nanoDb.view(designDoc, view, function (err, body) {
        if (!err) {
            for (var i = 0; i < body.rows.length; i++) {
                console.log(body.rows[i].key, body.rows[i]);
            }
        } else {
            console.log("Error", err);
        }
    });
}

//createDesignDocument();

showView('example', 'simple');
