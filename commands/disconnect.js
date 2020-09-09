module.exports = {
    name: 'disconnect' || 'dc',
    description: 'disconnects from current voice chat',
    execute(message) {
        let VoiceChannel = message.guild.channels.find(channel => channel.id === message.member.voiceChannelID);
    
        // Checks if a user is not in a voice channel
        if(!VoiceChannel) {
            message.channel.send("How about you try joining a vc first ya faggot? :)")
            return;
        }

        // Joins current discord voice channel
        try {
            message.guild.voiceConnection.disconnect();
            return;
        }
        catch {
            message.channel.send("I.. I, don't know what to do with myself sorry :(")
        }
    }
}