const { version } = require('F:/Programming/discord-bot/config.json');

module.exports = {
    name: 'help',
    description: 'it uh, helps?',
    execute(message, client) {
        message.channel.send({embed: {
            color: 16102856,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            description: `${message.author.username} is a simp and needs help :)`,
            fields: [
                {
                    name: 'Commands',
                    value: '`help`\n`join`',
                    inline: true
                },
                {
                    name: 'Music',
                    value: '`play <YouTube Link>`\n`pause`\n`skip`\n`stop`',
                    inline: true
                },
                {
                    name: 'Admin',
                    value: '`kick [@user] <reason>`\n`mute [@user] <time>`',
                    inline: true
                },
                {
                    name: 'Links:',
                    value: '[Github](https://github.com/AKR0SS/Kumiko-Discord-Bot) | [Discord](https://discord.gg/ANgfZVa)'
                }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: 'v' + version
            }
        }});

        //const botembed = new Discord.RichEmbed()
        //return message.channel.send(botembed);
    }
}