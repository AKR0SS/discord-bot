const { version } = require('../config.json');

module.exports  = {
	name: 'kick',
	description: 'well, it kicks people',
	execute(message, args, client) {
		let kickUser = message.guild.member(message.mentions.users.first());
		let kickReason = args.slice(1).join(' ');

		// Checks if user exists
		if (!kickUser) {
			message.channel.send("That's not even a user, what am i paying you to be admin for cuck? :)")
			return;
		}
		// Checks for kick reason
		else if (!kickReason) {
			message.channel.send("Cum on, what is the reason for it, you should be the one being kicked fag :)")
			return;
		}

		// passes kicked member with reason
		message.guild.member(kickUser).kick(kickReason)
		kickEmbed(kickReason)

		function kickEmbed(kickReason) {
			const taggedUser = message.mentions.users.first();

            message.channel.send({embed: {
				color: 16102856,
                fields: [
                    {
                        name: `User: ${taggedUser.username}`,
                        value: 'Reason: ' + kickReason
                    },
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: 'v' + version
                }
            }});
        }
	}
}