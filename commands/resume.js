module.exports = {
    name: 'resume',
    description: 'Resumes currently pauses video',
    execute(message, servers) {
        var server = servers[message.guild.id];

        try {
            server.dispatcher.resume();

            message.channel.send('video resumed')
        }
        catch {
            return message.channel.send("resume didn't work")
        }
    }
}