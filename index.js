const fs = require('fs');
const http = require('http');
const stream = require('stream');
const request = require('request');
const Eris = require("eris");
const dotenv = require("dotenv")

dotenv.config()

const bot = new Eris(process.env.DISCORD_BOT_TOKEN);

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

bot.on("ready", () => {
    console.log("Klaar om tegeltjes te maken!");
});

// https://www.wijsheidspreuk.nl/tegelimage.php?text=test&font-size=37&font=Ruthie

bot.on("messageCreate", (msg) => {
    if(msg.content.includes("/tegeltje")) {
        const myFonts = [
            'Alegreya',
            'Capsuula',
            'Ankecallig'
        ];
        var randomFont = myFonts[Math.floor(Math.random() * myFonts.length)];
        const message = msg.content.replace('/tegeltje', '');
        if (message || 0 !== message.length) {
            download('http://www.wijsheidspreuk.nl/tegelimage.php?font=' + randomFont + '&text=' + message, 'tegeltje.jpg', function(){
                fs.readFile('tegeltje.jpg', (err, data) => {
                    msg.channel.createMessage('', {
                        file: data,
                        name: 'tegeltje.jpg'
                    });
                });
            });
        }
    }
});

bot.connect();