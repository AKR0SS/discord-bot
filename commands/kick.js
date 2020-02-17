const Discord = require('discord.js');

module.exports  = {
	name: 'kick',
	description: 'well, it kicks people',
	execute(message, args) {
		const taggedUser = message.mentions.users.first();
		
		if (message.mentions.users.size) {
			message.channel.send(`${taggedUser.username} has been simped :)`)
		}
		else
			message.channel.send('Please @ someone before you try kicking retard :)')
	}
}