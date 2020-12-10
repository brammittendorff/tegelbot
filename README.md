# Tegeltjes bot for discord
 
Sometimes people say strange things at work like: Stop it with the good idea's, i will think of something myself. Then we always put it with a marker on a tile on the wall. Now I created a bot that will do exacly the same but then in discord.

When you add this bot to the channel it will look for messages with `/tile`.

## Bot

### Requirements
 
- node
- npm
 
### Configuration
 
```
npm install
```

### Run the bot
 
```
node index.js
```

### Usage of bot

Create a tile and display tile

```
/tile say When in doubt push it live
```

Save a tile

```
/tile save When in doubt push it live
```

List last 10 tiles
```
/tile list
```

Delete tile
```
/tile delete <tilenumber>
```

Select a tile
```
/tile select <tilenumber>
```

## Deployment

### Add bot to server

[Add to server](https://discord.com/api/oauth2/authorize?client_id=764061123501752330&permissions=518208&scope=bot)

### Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/brammittendorff/tegelbot)

## Development

### Create an environment

Create a `.env` file with the following contents:

```
DISCORD_BOT_TOKEN="discordbottoken"
DATABASE_HOSTNAME="dbhostname"
DATABASE_USERNAME="dbusername"
DATABASE_PASSWORD="dbpassword"
DATABASE_DATABASE="dbname"
```

### Migrations

Create migrations:

```
node src/database/pool.js add migration create_test_migration
```

Run migrations:

```
node src/database/pool.js up
```
