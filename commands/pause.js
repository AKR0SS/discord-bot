module.exports = {
    name: 'pause',
    description: 'Pauses currently playing music',
    execute(message, servers) {
        var server = servers[message.guild.id];

        try {
            server.dispatcher.pause();

            message.channel.send('video paused')
        }
        catch {
            return message.channel.send("pause didn't work")
        }
    }
}