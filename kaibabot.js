const Discord = require('discord.js');
const quotes = require('./quotes.json');
const bot = new Discord.Client();
const prefix = '!';

bot.on('message', async message => {
    
    console.log(message.content);

    if (message.content == `${prefix}Seto`) {
        await message.channel.send('Kaiba.');
    }
});

bot.login('client key');