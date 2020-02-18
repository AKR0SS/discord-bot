module.exports = {
    name: 'skip',
    description: 'skips the video currently playing',
    execute(message, servers, client) {
        let VoiceChannel = message.guild.channels.find(channel => channel.id === message.member.voiceChannelID);
        
        // Checks if user is in a voice channel
        if(!VoiceChannel) {
            message.channel.send('How about you try joining a vc first ya faggot? :)')
            return;
        }
        // Checks if bot is in voice channel
        else if(VoiceChannel !== client.voiceChannelID) {
            message.channel.send('Try joining me and then skipping a song nerd :)')
            return;
        }

        var server = servers[message.guild.id];

        if(server.dispatcher) {
            // bc of dispatcher, it ends() current playing song
            server.dispatcher.end();
            message.channel.send('why did you queue that song if you were just going to skip it faggot?')
        }
    }
}