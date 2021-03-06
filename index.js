const dotenv = require("dotenv");
const Eris = require("eris");
const tileDatabase = require('./src/database/main');
const tileCreate = require('./src/tile/create');

dotenv.config()

String.prototype.format = function() {
    let a = this;
    for (let k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

const bot = new Eris(process.env.DISCORD_BOT_TOKEN);

let prefix = '/tile';

bot.on("ready", () => {
    console.log("Ready to make tiles!");
});

bot.on("messageCreate", (msg) => {
    const authorId = parseInt(msg.author.id);
    if(msg.content.includes(prefix)) {
        let prefixSay = prefix + ' say';
        let prefixSave = prefix + ' save';
        let prefixList = prefix + ' list';
        let prefixSelect = prefix + ' select';
        let prefixDelete = prefix + ' delete';
        if(msg.content.includes(prefixSay)) {
            let message = msg.content.replace(prefixSay, '');
            (async () => {
                await tileCreate.create(msg, authorId, message);
            })();
        } else if (msg.content.includes(prefixSave)) {
            let message = msg.content.replace(prefixSave, '');
            (async () => {
                await tileDatabase.addTile(authorId, message);
            })();
        } else if (msg.content.includes(prefixList)) {
            let page = parseInt(msg.content.replace(prefixList, '')) || 1;
            (async () => {
                let tiles = 0;
                if (page > 0) {
                    tiles = await tileDatabase.getTiles(authorId, page);
                }
                if (tiles.length) {
                    let allTiles = '```';
                    for (const tile in tiles) {
                        allTiles += "{0}    {1}\n".format(tiles[tile].id, tiles[tile].text);
                    }
                    const totalTiles = await tileDatabase.getTotalTiles(authorId);
                    let totalPages = Math.ceil(totalTiles[0].totalTiles / 10)
                    let pagination = '';
                    for (let i = 1; i <= totalPages; i++) {
                        if (page >= 1 && page == i) {
                            pagination += "[{0}] ".format(i);
                        } else {
                            pagination += "{0}  ".format(i);
                        }
                    }
                    allTiles += '----------------------------------\n';
                    allTiles += pagination;
                    allTiles += '```';
                    bot.createMessage(msg.channel.id, allTiles);
                } else {
                    bot.createMessage(msg.channel.id, '```There are no tiles on this page yet.```');
                }
            })();
        } else if (msg.content.includes(prefixSelect)) {
            let tileId = parseInt(msg.content.replace(prefixSelect, ''));
            (async () => {
                let tile = await tileDatabase.getTile(authorId, tileId);
                if (tile.length) {
                    await tileCreate.create(msg, authorId, tile[0].text, false);
                }
            })();
        } else if (msg.content.includes(prefixDelete)) {
            let tileId = parseInt(msg.content.replace(prefixDelete, ''));
            if (msg.content.includes('delete all')) {
                (async () => {
                    await tileDatabase.deleteAllTiles(authorId);
                    bot.createMessage(msg.channel.id, '```Deleted all tiles```');
                })();
            } else {
                (async () => {
                    await tileDatabase.deleteTile(authorId, tileId);
                    bot.createMessage(msg.channel.id, '```Deleted tile: {0}```'.format(tileId));
                })();
            }
        }
    }
});

bot.connect();
