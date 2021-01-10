const {
    version,
} = require('../config.json');

module.exports = {
    name: 'mute',
    description: 'either mutes or temp mutes @user',
    execute(message, args, client) {
        const muteUser = message.guild.member(message.mentions.users.first());
        const muteReason = args.slice(1).join(' ');

        // Checks if user exists
        if (!muteUser) {
            message.channel.send('That\'s not even a user, what am i paying you to be admin for cuck? :)');
            return;
        }

        muteEmbed(muteReason);

        function muteEmbed(muteReason) {
            const taggedUser = message.mentions.users.first();

            message.channel.send({
                embed: {
                    color: 16102856,
                    fields: [{
                        name: `User: ${taggedUser.username}`,
                        value: 'Reason: ' + muteReason,
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