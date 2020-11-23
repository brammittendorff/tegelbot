var pool = require('./pool')

async function getTile(authorId, tileId) {
    try {
        return pool.query("SELECT text FROM tiles WHERE member_id=? AND id=?", [authorId, tileId]);
    } catch(err) {
        console.log(err);
    }
}

async function getTiles(authorId, page) {
    page = page - 1;
    try {
        return pool.query("SELECT * FROM tiles WHERE member_id=? ORDER BY created_at DESC LIMIT ?, ?", [authorId, (page*10), (page*10)+10]);
    } catch(err) {
        console.log(err);
    }
}

async function getTotalTiles(authorId) {
    try {
        return pool.query("SELECT count(id) as totalTiles FROM tiles WHERE member_id=?", authorId);
    } catch(err) {
        console.log(err);
    }
}

async function addTile(authorId, text) {
    let stmt = `INSERT INTO tiles(member_id, text) VALUES (?, ?)`;
    try {
        return pool.query(stmt, [authorId, text]);
    } catch (err) {
        console.error(err);
    }
}

async function deleteTile(authorId, id) {
    let stmt = `DELETE FROM tiles WHERE id=? AND member_id=?`;
    try {
        return pool.query(stmt, [id, authorId]);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { getTile, getTiles, getTotalTiles, addTile, deleteTile }
