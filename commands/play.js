const ytdl = require('ytdl-core');
const {
    version,
} = require('../config.json');

module.exports = {
    name: 'play' || 'p',
    description: 'plays music from youtube',
    execute(message, args, servers, client, prefix) {
        // VoiceChannel gets the user's current voice channel
        const VoiceChannel = message.guild.channels.find(channel => channel.id === message.member.voiceChannelID);

        // Checks if user is in a voice chat
        if (!VoiceChannel) {
            message.channel.send('How about you try joining a vc first ya faggot? :)');
            return;
        }
        // Checks if the arguments are empty
        else if (!args[0]) {
            message.channel.send('You can\'t play the fucking air moron :)');
            return;
        }

        if (message.content.startsWith(prefix + 'play https://www.youtube.com/watch?v=') || message.content.startsWith(prefix + 'play https://youtu.be/') || (prefix + 'p https://www.youtube.com/watch?v=') || message.content.startsWith(prefix + 'p https://youtu.be/')) {
            // Sets a server's music queue
            if (!servers[message.guild.id]) {servers[message.guild.id] = {
                queue: [],
            };}

            // Sets url to a string
            // eslint-disable-next-line no-var
            var server = servers[message.guild.id];
            server.queue.push(args.join(' '));

            // Joins the user's voice chat and calls play()
            if (!message.guild.voiceConnection) {VoiceChannel.join().then(function(connection) {
                play(connection, message);
            });}

            // Checks if it's the first song being queue'd and sends a now playing message
            /* if(server.queue[1]) {
                nowPlaying(message)
            }*/
            searching(message);

            // Called by execute
            // eslint-disable-next-line no-inner-declarations
            function play(connection, message) {
                const server = servers[message.guild.id];

                // plays the video in queue and passes settings args
                server.dispatcher = connection.playStream(ytdl(server.queue[0], {
                    filter: 'audioonly',
                    highWaterMark: 1 << 25,
                }));

                server.queue.shift();

                server.dispatcher.on('end', function() {
                    // Checks if songs are queue'd
                    if (server.queue[0]) {
                        nowPlaying(message);

                        play(connection, message);
                    } else {
                        message.channel.send('-> Queue is now empty, fill me again ;)');
                        connection.disconnect();
                    }
                });
            }
        } else if (!message.content.startsWith('|play https://www.youtube.com/watch?v=')) {
            message.channel.send('That\'s.. not a YouTube video fukin faggot :)');
            return;
        } else if (!message.content.startsWith('|play https://youtu.be/')) {
            message.channel.send('That\'s.. not a YouTube video fukin queer :)');
            return;
        } else
            {return;}

        // Sends now playing message
        function nowPlaying(message) {
            ytdl.getInfo(server.queue[0], (err, info) => {
                if (err) throw err;

                message.channel.send({
                    embed: {
                        color: 16102856,
                        author: {
                            name: 'Now Playing',
                            icon_url: client.user.avatarURL,
                        },
                        thumbnail: {
                            url: info.videoDetails.thumbnail_url,
                        },
                        description: `[${info.videoDetails.title}](${args})`,
                        fields: [{
                            name: 'Song Length',
                            value: ~~(info.videoDetails.lengthSeconds / 60) + ':' + info.videoDetails.lengthSeconds % 60,
                        }],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: 'v' + version,
                        },
                    },
                });
            });
        }

        // Sends a confirmation message after sending a YouTube link
        function searching(message) {
            ytdl.getInfo(server.queue[0], (err, info) => {
                if (err) throw err;

                message.channel.send(`-> Found **${info.videoDetails.title}** \n` + `\`${args}\``);
            });
        }
    },
};