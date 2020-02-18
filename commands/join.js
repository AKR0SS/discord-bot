module.exports = {
    name: 'join',
    description: 'joins current voice chat',
    execute(message, client) {
        let VoiceChannel = message.guild.channels.find(channel => channel.id === message.member.voiceChannelID);
    
        // Checks if user is in a voice chat
        if(!VoiceChannel) {
            message.channel.send('How about you try joining a vc first ya faggot? :)')
            return;
        }

        if(!message.guild.voiceConnection)  {
            VoiceChannel.join()

            message.channel.send(message.author + " is a simp feeling lonely without a girlfriend so they've got a bot to join 'em, me :)")

            return;
        }
        else {
            message.channel.send('but.. you said to join and I did.... fuking simp :)')
        }
    }
}