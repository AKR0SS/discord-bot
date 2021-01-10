const {
    version,
} = require('../config.json');

module.exports = {
    name: 'help' || 'h',
    description: 'it uh, helps?',
    execute(message, args, client) {
        message.channel.send({
            embed: {
                color: 16102856,
                author: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL(),
                },
                fields: [{
                        name: 'Commands',
                        value: '`help` or `h`\n`join`\n`disconnect` or `dc`\n`nhentai`\n`8ball`',
                    },
                    {
                        name: 'Music',
                        value: '`play [YouTube Link]` or `p [YouTube Link]`\n`resume`\n`pause`\n`skip` or `s`\n`stop`\n',
                    },
                    {
                        name: 'Admin',
                        value: '`kick [@user] <reason>`\n`mute [@user] <reason>`\n`tempmute [@user] <timeLength>`\n',
                    },
                    {
                        name: 'Links:',
                        value: '[Github](https://github.com/AKR0SS/Kumiko-Discord-Bot) | [Discord](https://discord.gg/ANgfZVa)',
                    },
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.displayAvatarURL(),
                    text: 'v' + version,
                },
            },
        });
    },
};