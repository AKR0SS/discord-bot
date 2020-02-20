const ytdl = require("ytdl-core");
const Discord = require('discord.js');
const { version } = require('F:/Programming/discord-bot/config.json');

module.exports = {
    name: 'play',
    description: 'plays music from youtube',
    alias: 'p',
    execute(message, args, servers, client, prefix) {
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
        
        if (message.content.startsWith(prefix + 'play https://www.youtube.com/watch?v=') || message.content.startsWith(prefix + 'play https://youtu.be/')) {
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

            // Checks if it's the first song being queue'd and sends a now playing message
            if(server.queue[1]) {
                nowPlaying(message)
            }

            // Called by execute
            function play(connection, message) {
                var server = servers[message.guild.id];

                // plays the video in queue and passes settings args
                server.dispatcher = connection.playStream(ytdl(server.queue[0], {
                    filter: "audioonly",
                    highWaterMark: 1<<25
                }));
                
                server.queue.shift();

                server.dispatcher.on('end', function() {
                    // Checks if songs are queue'd
                    if(server.queue[0]) {
                        nowPlaying(message)
                        
                        play(connection, message)
                    }
                    else {
                        message.channel.send('-> Queue is now empty, fill me again ;)')
                        connection.disconnect();
                    }
                });
            }
        }
        else if(!message.content.startsWith('|play https://www.youtube.com/watch?v=')) {
            message.channel.send('not a video')
            return;
        }
        else if (!message.content.startsWith('|play https://youtu.be/')) {
            message.channel.send('not a video')
            return;
        }
        else
            return;

        // Sends now playing message
        function nowPlaying(message) {
            message.channel.send({embed: {
                color: 16102856,
                thumbnail: {
                    url: ytdl.getInfo.thumbnail // idk how to get a thumbnail
                },
                fields: [
                    {
                        name: 'Now Playing',
                        value: 'TITLE'//ytdl.getBasicInfo()
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: 'v' + version
                }
            }});
        }
    }
}
