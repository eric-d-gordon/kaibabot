const GameState = require('./GameState.js');
const Single = require('./Single.js');
const Match = require('./Match.js');
const Discord = require('discord.js');
const quotes = require('./quotes.json');
const bot = new Discord.Client();
const prefix = '!';

var gameState = new GameState('Player1', 'Player2', new Single());

bot.on('message', async message => {
    logRequest(message);

    const isLifePointsChannel = message.channel instanceof Discord.TextChannel && message.channel.name == 'life-points';
    const isNotFromSelf = message.author.username != 'MrBeepBopper';


    if (isLifePointsChannel && message.content.startsWith('!game')) {
        await handleLifePointsModule(message);
    }
    if (message.content == `${prefix}seto`) {
        await sendBackDiscordMessage(message, 'Kaiba');
    } else if (message.content == `${prefix}insult`) {
        await sendBackDiscordMessage(message, generateRandomArrayItem(quotes.kaibaQuotes));
    }
});

bot.login('client key');

async function sendBackDiscordMessage(message, reply) {
    await message.channel.send(reply);
}

function logRequest(message) {
    console.log(`Author[${message.author.username}] executed command[${message.content}]`);
}

function generateRandomArrayItem(theArray) {
    const randomIndex = Math.floor(Math.random() * theArray.length);
    return theArray[randomIndex];
}

async function handleLifePointsModule(message) {
    const messageArguments = message.content.split(" ");
    await sendBackDiscordMessage(message, handleLifePointsCommand(messageArguments));
}

function handleLifePointsCommand(args) {
    const command = args[1];
    
    if (command == 'new' && args.length == 5) {
        return creatNewGame(args);
    } else if (command == 'lose' && args.length == 4) {
        return loseLifePoints(args);
    } else if (command == 'gain' && args.length == 4) {
        return gainLifePoints(args);
    }
    return gameState.toString();
}

function creatNewGame(args) {
    const gameType = args[2];
    const player1Name = args[3];
    const player2Name = args[4];
    if (gameType == 'Single') {
        gameState = new GameState(player1Name, player2Name, new Single());
    } else if (gameType == 'Match') {
        gameState = new GameState(player1Name, player2Name, new Match());
    }

    return printNewGameHeader() + gameState.toString();
}

function printNewGameHeader() {
    return 'Starting a new ' + gameState.gameType.toString() + '\n';
}

function loseLifePoints(args) {
    const player = args[2];
    const amount = args[3];
    if (gameState.leftPlayer.name == player) {
        gameState.leftPlayer.loseLife(amount);
    } else if (gameState.rightPlayer.name == player) {
        gameState.rightPlayer.loseLife(amount);
    }
    return gameState.toString();
}

function gainLifePoints(args) {
    const player = args[2];
    const amount = args[3];
    if (gameState.leftPlayer.name == player) {
        gameState.leftPlayer.gainLife(amount);
    } else if (gameState.rightPlayer.name == player) {
        gameState.rightPlayer.gainLife(amount);
    }
    return gameState.toString();
}