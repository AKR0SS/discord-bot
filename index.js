// checks for native file system module
const fs = require('fs');

// checks for required discord.js module
const Discord = require('discord.js');

// checks for required config.json
const { prefix, token } = require('./config.json');

// creates new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Array of file names
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('\n',
    '/***************************/\n',
    '/                           /\n',
    '/        NOW ONLINE         /\n',
    '/                           /\n',
    '/***************************/');
});

// Listens for messages
client.on('message', message => {
    // Ignores messages without prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Array of entered command
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

// @EVERYONE
    // HELP
    if (message.content.startsWith(`${prefix}help`)) {
        client.commands.get('help').execute(message, args);
    }
    // MUSIC
    if (message.content.startsWith(`${prefix}play`)) {
        client.commands.get('play').execute(message, args);
    }
// ADMINISTRATOR COMMANDS
    else if (message.member.hasPermission('ADMINISTRATOR')) {
    // KICK
        if (message.content.startsWith(`${prefix}kick`)) {
            client.commands.get('kick').execute(message, args);
        } 
    // DEFAULT
        else {
            return message.reply('Either ' + message + ' is not a command or you are retarded, please see |help :)')
        }
    }
// DEFAULT
    else {
        return message.reply('Either ' + message + ' is not a command or you are retarded, please see |help :)')
    }

    //message.channel.send("\n" + "```debug```" + `\tCommand: ${command} \n\tArguments: ${args}`)
    //console.log(message.content);
});

// Discord login with app's token
client.login(token);