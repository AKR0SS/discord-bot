module.exports = {
    name: 'stop',
    description: 'stops the current song playing',
    execute(message, servers) {
        var server = servers[message.guild.id];

        // Checks for Voice Connection
        if(message.guild.voiceConnection) {
            // Clears all songs from queue
            for(var i = server.queue.length -1; i >= 0; i--) {
                server.queue.splice(i, 1);
            }

            server.dispatcher.end();
        }

        // If connected, dc from vc
        if(message.guild.connection)
            message.guild.voiceConnection.disconnect();
    }
}