let fs = require('fs');
let tileDownload = require('./download');
let tileDatabase = require('../database/main');

async function create(msg, authorId, message, select=true) {
    let myFonts = [
        'Alegreya',
        'Capsuula',
        'Ankecallig'
    ];
    let randomFont = myFonts[Math.floor(Math.random() * myFonts.length)];
    if (message || 0 !== message.length) {
        if (select) {
            tileDatabase.addTile(authorId, message);
        }
        tileDownload.download('http://www.wijsheidspreuk.nl/tegelimage.php?font=' + randomFont + '&text=' + message, 'tile.jpg', function() {
            fs.readFile('tile.jpg', (err, data) => {
                msg.channel.createMessage('', {
                    file: data,
                    name: 'tile.jpg'
                });
            });
        });
    }
}

module.exports = { create }