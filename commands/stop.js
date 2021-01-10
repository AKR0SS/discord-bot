module.exports = {
    name: 'stop',
    description: 'stops the current song playing',
    execute(message, servers) {
        const server = servers[message.guild.id];

        // Checks for Voice Connection
        if (message.guild.voiceConnection) {
            // Clears all songs from queue
            for (let i = server.queue.length - 1; i >= 0; i--) {
                server.queue.splice(i, 1);
            }

            server.dispatcher.end();
        } else {
            message.channel.send('I can\'t stop something that isn\'t playing fag :)');
        }

        // If connected, dc from vc
        if (message.guild.connection) {
            message.guild.voiceConnection.disconnect();
        }
    },
};