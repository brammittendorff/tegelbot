let fs = require('fs');
let request = require('request');

async function download(uri, filename, callback) {
    request.head(uri, function(){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

module.exports = { download }