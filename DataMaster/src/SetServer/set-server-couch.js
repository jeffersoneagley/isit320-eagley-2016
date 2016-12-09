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
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', serverToTest, false); // false for synchronous request
    xmlHttp.send(null);
    console.log(xmlHttp);
    return (xmlHttp.status === 200);
}

module.exports.serverUrl = serverUrl;
module.exports.initializeServer = function() {
    'use strict';
    for (var serv in servers) {
        if (servers.hasOwnProperty(serv)) {
            if (checkServerAlive(servers[serve])) {
                serverIndex = serv;
            }
        }
    }
};

initializeServer();
