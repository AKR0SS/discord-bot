// checks for native file system module
const fs = require('fs');

// checks for required discord.js module
const Discord = require('discord.js');

// checks for required config.json
const { prefix, token } = require('./config.json');

// creates new Discord client
var client = new Discord.Client();
client.commands = new Discord.Collection();

// Array of file names
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    
    // set a new item in the Collection
	// with the key as the command name and the value as the exported module
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
    client.user.setActivity("Akross's alt ego")
});

var servers = {};

// Listens for messages
client.on('message', message => {
    // Ignores messages without prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Array of entered command
    const args = message.content.substring(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    
// @EVERYONE
    switch(command) {
        case 'help':
            client.commands.get('help').execute(message, client);
            break;
        case 'join':
            client.commands.get('join').execute(message);
            break;
        // MUSIC
        case 'play':
            client.commands.get('play').execute(message, args, servers);
            break;
        case 'skip':
            client.commands.get('skip').execute(message, args, servers);
            break;
        default:
    // ADMINISTRATOR
            if (message.member.hasPermission('ADMINISTRATOR')) {
                switch(command) {
                    case 'kick':
                        client.commands.get('kick').execute(message, args);
                        break;
                    default:
                        return message.reply('Either ' + message + ' is not a command or you are retarded, please see |help :)')
                }
            }
            else
                return message.reply('Either ' + message + ' is not a command or you are retarded, please see |help :)')
    }

    //message.channel.send("```DEBUG```" + `\nCommand: ${command}\n Arguments: ${args}`);
});

// Discord login with app's token
client.login(token);