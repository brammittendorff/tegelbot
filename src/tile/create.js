let tileDatabase = require('../database/main');
const { createCanvas, loadImage } = require('canvas');
const canvasTxt = require('canvas-txt').default

async function create(msg, authorId, message, select=true) {

    const width = 600;
    const height = 600;
    const fontSize = 32;
    const paddingX = 75;
    
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    
    if (message || 0 !== message.length) {
        if (select) {
            tileDatabase.addTile(authorId, message);
        }

        loadImage('images/2.jpg').then((image) => {  
            let myFonts = [
                'Arial',
                // 'Palatino Linotype',
                // 'Book Antiqua',
                // 'Times New Roman',
            ];
            let randomFont = myFonts[Math.floor(Math.random() * myFonts.length)];
    
            ctx.drawImage(image, 0, 0, width, height)
            ctx.font = fontSize + 'px ' + randomFont;
            
            ctx.fillStyle = '#000000'
            canvasTxt.font = randomFont;
            canvasTxt.fontWeight = 'bold';
            canvasTxt.fontSize = fontSize;
            canvasTxt.align = 'center'
            canvasTxt.lineHeight = fontSize;
            canvasTxt.drawText(ctx, message, paddingX, 0, (width-(paddingX*2)), height);

            const canvasBuffer = canvas.toBuffer('image/png', { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE })
    
            msg.channel.createMessage('', {
                file: canvasBuffer,
                name: 'tile.jpg'
            });
        });
    }
}

module.exports = { create }