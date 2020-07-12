// checks for native file system module
const fs = require('fs');

// checks for required discord.js module
const Discord = require('discord.js');

// checks for required config.json
const { prefix, token, version, author } = require('./config.json');

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
    '/****************************************/\n',
    '/                                        /\n',
    '/       ' + client.user.username + ' v' + version +' is now Online      /\n',
    '/                                        /\n',
    '/****************************************/\n');

    let serverCount = client.guilds.size;
    let memberCount = client.users.size;

    // Bot Activity
    let activities = [
        '|help :)',
        serverCount + ' servers :)',
        memberCount + ' members :)',
        "Akross's alt ego"
    ]

    setInterval(() => {
        serverCount = client.guilds.size;
        memberCount = client.users.size;

        let activity = activities[Math.floor(Math.random() * activities.length)]
        client.user.setActivity(activity, {type: "WATCHING"})
    }, 60000)
});

var servers = {};

// Listens for messages
client.on('message', message => {
    // Ignores messages without prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Array of entered command
    const args = message.content.substring(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    
    // EVERYONE
    try{
        switch(command) {
            case 'help':
                client.commands.get('help').execute(message, client);
                break;

            case 'nhentai':
                client.commands.get('nhentai').execute(message);
                break;

            case 'join':
                client.commands.get('join').execute(message);
                break;

            // MUSIC
            case 'play':
                client.commands.get('play').execute(message, args, servers, client, prefix);
                break;
                
                case 'p':
                client.commands.get('play').execute(message, args, servers, client, prefix);
                break;

            case 'skip':
                client.commands.get('skip').execute(message, servers, client);
                break;
            case 'stop':
                client.commands.get('stop').execute(message, servers);
                break;

            case 'pause':
                client.commands.get('pause').execute(message, servers)
                break;

            case 'resume':
                client.commands.get('resume').execute(message, servers)
                break;

            default:
        // ADMINISTRATOR
                try { (message.member.hasPermission('ADMINISTRATOR'))
                    switch(command) {
                        case 'kick':
                            client.commands.get('kick').execute(message, args, client);
                            break;

                        case 'mute':
                            client.commands.get('mute').execute(message, args, client)
                            break;

                        case 'tempmute':
                            client.commands.get('tempmute').execute(message, args, client)
                            break;

                        default:
                            return message.reply("I can't understand simp :)")
                    }
                }
                catch (e) {
                    console.log(e);
                    return message.reply("I can't understand simp :)")
                }
        }
    } catch (e) {console.log(e)}
});

// Discord login with app's token
client.login(token);