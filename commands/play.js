module.exports = {
    name: 'play',
    description: 'plays music from youtube',
    execute(message, args) {
        let VoiceChannel = message.guild.channels.find(channel => channel.id === message.member.voiceChannelID);

        const ytdl = require('ytdl-core');
        const streamOptions = { seek: 0, volume: 1 };

        if(VoiceChannel != null) {
            //console.log('Joining voice channel ' + VoiceChannel.name);

            VoiceChannel.join()
            .then(connection => {
                console.log('Joined ' + VoiceChannel.name)

                const stream = ytdl(String(args), {filter : 'audioonly'});
                const dispatcher = connection.playStream(stream, streamOptions);
            })
            .catch(console.error);
        }
        else {
            message.channel.send("How about you try joining a vc first ya faggot?")
        }
    }
}