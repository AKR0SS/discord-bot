module.exports = {
    name: 'stop',
    description: 'stops the music currently playing',
    execute(message, args) {
        let VoiceChannel = message.guild.channels.find(channel => channel.id === message.member.voiceChannelID);

    }
}