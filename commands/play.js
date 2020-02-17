const { Util } = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = {
    name: 'play',
    description: 'plays music from youtube',
    alias: 'p',
    execute(message, args, servers) {
        // VoiceChannel gets the user's current voice channel
        let VoiceChannel = message.guild.channels.find(channel => channel.id === message.member.voiceChannelID);

        // Checks if user is in a voice chat
        if(!VoiceChannel) {
            message.channel.send('How about you try joining a vc first ya faggot? :)')
            return;
        }
        // Checks if the arguments are empty
        else if(!args[0]) {
            message.channel.send("You can't play the fucking air moron :)")
            return;
        }
        
        // Sets a server's music queue
        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        };

        // Sets url to a string
        var server = servers[message.guild.id];
        server.queue.push(args.join(" "));

        // Joins the user's voice chat and calls play()
        if(!message.guild.voiceConnection) VoiceChannel.join().then(function(connection) {
            play(connection, message);
        });

        // Called by execute
        function play(connection, message) {
            var server = servers[message.guild.id];

            // plays the video in queue and passes settings args
            server.dispatcher = connection.playStream(ytdl(server.queue[0]), {
                filter: "audioonly",
                quality: 'highestaudio',
                volume: 1,
                highWaterMark: 1<<25
            });
            
            server.queue.shift();

            server.dispatcher.on('end', function() {
                // Checks if songs are queue'd
                if(server.queue[0]) {
                    message.channel.send('-> Playing the next dumbass song in queue :)')
                    play(connection, message)
                }
                else {
                    message.channel.send('-> Queue is now empty, fill me again ;)')
                    connection.disconnect();
                }
            });
        }
    }
}