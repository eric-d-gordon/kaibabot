const Discord = require('discord.js');
const quotes = require('./quotes.json');
const bot = new Discord.Client();
const prefix = '!';

bot.on('message', async message => {
    
    if (message.content == `${prefix}seto`) {
        await sendBackDiscordMessage(message, 'Kaiba');
    } else if (message.content == `${prefix}insult`) {
        await sendBackDiscordMessage(message, generateRandomArrayItem(quotes.kaibaQuotes));
    }
});

bot.login('client key');

async function sendBackDiscordMessage(message, reply) {
    console.log(`Author[${message.author.username}] executed command[${message.content}]`);
    await message.channel.send(reply);
}

function generateRandomArrayItem(theArray) {
    const randomIndex = Math.floor(Math.random() * theArray.length);
    return theArray[randomIndex];
}
