module.exports = {
    name: 'skip' || 's',
    description: 'skips the video currently playing',
    execute(message, servers) {
        let VoiceChannel = message.guild.channels.find(channel => channel.id === message.member.voiceChannelID);
        
        // Checks if user is in a voice channel
        if(!VoiceChannel) {
            message.channel.send('How about you try joining a vc first ya faggot? :)')
            return;
        }
        // Checks if bot is in voice channel
        
        var server = servers[message.guild.id];

        if(server.dispatcher) {
            // bc of dispatcher, it ends() current playing song
            server.dispatcher.end();
            message.channel.send('why did you queue that song if you were just going to skip it faggot?')
        }
    }
}