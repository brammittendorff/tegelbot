let tileDatabase = require('../database/main');
const { registerFont, createCanvas, loadImage } = require('canvas');
const canvasTxt = require('canvas-txt').default

registerFont('static/fonts/DancingScript-Regular.ttf', { family: 'Dancing_Script' })
registerFont('static/fonts/PlayfairDisplay-Regular.ttf', { family: 'Playfair_Display' })
registerFont('static/fonts/Amita-Regular.ttf', { family: 'Amita_Regular' })

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

        loadImage('static/images/2.jpg').then((image) => {  
            let myFonts = [
                'Dancing_Script',
                'Playfair_Display',
                'Amita_Regular',
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