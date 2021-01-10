module.exports = {
    name: 'disconnect' || 'dc',
    description: 'disconnects from current voice chat',
    execute(message, args, client) {
        const VoiceChannel = message.guild.channels.find(channel => channel.id === message.member.voiceChannelID);

        // Checks if a user is not in a voice channel
        if(!VoiceChannel) {
            message.channel.send('You need to be in a Voice Channel to use this command');
            return;
        }

        // Disconnects from current discord voice channel
        try {
            return message.guild.voiceConnection.disconnect();
        }
        catch (error) {
            message.channel.send('I.. I, don\'t know what to do with myself sorry :(');
            return console.log(error);
        }
    },
};