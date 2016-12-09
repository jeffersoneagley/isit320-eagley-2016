var servers = ['http://127.0.0.1:5984',
    'http://192.168.2.19:5984',
    'http://192.168.2.27:5984',
    'http://168.156.41.96:5984',
    'http://10.0.2.5:5984'
];
var serverIndex = 1;
var serverUrl = servers[serverIndex];
console.log('SetServer middleware attaching to database on: ', serverUrl);

function checkServerAlive(serverToTest) {
    'use strict';
    console.log('checking server is alive');
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', serverToTest, false); // false for synchronous request
    xmlHttp.send(null);
    console.log(xmlHttp);
    return (xmlHttp.status === 200);
}

initializeServer = function() {
    'use strict';
    console.log('initializeServer called, checking which couch server is alive:');
    for (var serv in servers) {
        console.log(servers[serv]);
        if (servers.hasOwnProperty(serv)) {
            if (checkServerAlive(servers[serve])) {
                serverIndex = serv;
            }
        }
    }
};

initializeServer();

module.exports.serverUrl = serverUrl;
