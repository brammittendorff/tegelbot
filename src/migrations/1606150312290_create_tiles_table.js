module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS tiles (
        id int(11) NOT NULL auto_increment,
        member_id bigint,
        text varchar(250) NOT NULL default '',
        created_at timestamp not null default now(),
        primary key (id)
        );`,
    "down": "DROP TABLE tiles"
}