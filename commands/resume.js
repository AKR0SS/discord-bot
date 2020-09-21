module.exports = {
    name: 'resume',
    description: 'Resumes currently pauses video',
    execute(message, servers) {
        var server = servers[message.guild.id];

        try {
            server.dispatcher.resume();

            message.channel.send("Fine, I'll resume it.. only becuase a faggot asked me to :)")
        }
        catch (err) {
            message.channel.send("Yeah.. that didn't work moron :)")
            return console.log(err);
        }
    }
}