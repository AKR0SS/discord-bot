const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const {
    prefix,
    token,
    version,
    author,
} = require('./config.json');

client.once('ready', () => {
    console.log('\n',
        '/****************************************/\n',
        `/        ${client.user.username} v${version} is now Online       /\n`,
        `/            Created by ${author}           /\n`,
        '/****************************************/\n');

    let serverCount = client.guilds.cache.size;

    // Bot Activity
    const activities = [
        '|help :)',
        serverCount + ' servers',
        'Akross\'s alt ego',
    ];

    const intervalTime = 60000;
    setInterval(() => {
        serverCount = client.guilds.cache.size;

        const activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity, { type: 'WATCHING' });
    }, intervalTime);
});

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing the command');
    }

    // console.log(`${message.author}: ${message.content}`);
});

client.login(token);