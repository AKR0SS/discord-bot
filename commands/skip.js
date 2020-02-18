module.exports = {
    name: 'skip',
    description: 'skips the video currently playing',
    execute(message, servers) {
        var server = servers[message.guild.id];

        if(server.dispatcher) {
            // bc of dispatcher, it ends() current playing song
            server.dispatcher.end();
            message.channel.send('why did you queue that song if you were just going to skip it faggot?')
        }
    }
}