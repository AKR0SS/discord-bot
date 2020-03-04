module.exports = {
    name: 'pause',
    description: 'Pauses currently playing music',
    execute(message, servers) {
        var server = servers[message.guild.id];

        try {
            server.dispatcher.pause();

            message.channel.send("What're you retarded, why did you pause it? :)")
        }
        catch {
            return message.channel.send("Oh no.. it's retarded, maybe actually try pausing something yeah? :)")
        }
    }
}