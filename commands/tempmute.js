const {
    version,
} = require('../config.json');
const ms = require('ms');

module.exports = {
    name: 'tempmute',
    description: 'either mutes or temp mutes @user',
    async execute(message, args, client) {
        const muteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!muteUser) {
            message.channel.send('That\'s not even a user, what am i paying you to be admin for cuck? :)');
            return;
        }

        // Finds incel role
        let muteRole = message.guild.roles.find(x => x.name === 'incel');

        // Checks and creates incel role
        if (!muteRole) {
            try {
                muteRole = await message.guild.createRole({
                    name: 'incel',
                    color: '#000000',
                    permissions: [],
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
        }

        const muteTime = args[1];

        if (!muteTime) {
            message.channel.send('It\'s not that hard, you have to input a time value fucking retard :)');
            return;
        }

        await (muteUser.addRole(muteRole.id));
        muteEmbed(muteTime);

        // Removes muted role
        setTimeout(function() {
            muteUser.removeRole(muteRole.id);
            message.channel.send(`<@${muteUser.id}>` + ' has been unmuted, now don\'t do any more dumb shit you fucking inbred :)');
        }, ms(muteTime));

        function muteEmbed(muteTime) {
            const taggedUser = message.mentions.users.first();

            message.channel.send({
                embed: {
                    color: 16102856,
                    fields: [{
                        name: `User: ${taggedUser.username}`,
                        value: 'Mute Length: ' + muteTime,
                    } ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: 'v' + version,
                    },
                },
            });
        }
    },
};