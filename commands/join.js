module.exports = {
    name: 'join',
    description: 'joins current voice chat',
    execute(message) {
        let VoiceChannel = message.guild.channels.find(channel => channel.id === message.member.voiceChannelID);
    
        // Checks if a user is not in a voice channel
        if(!VoiceChannel) {
            message.channel.send('How about you try joining a vc first ya faggot? :)')
            return;
        }
        
        // Joins current discord voice channel
        try {
            VoiceChannel.join()
            return message.channel.send(message.author + " is a simp feeling lonely without a girlfriend so they've got a bot to join 'em, me :)")
        }
        catch (err) {
            message.channel.send("I.. I, don't know what to do with myself sorry :(")
            return console.log(err);
        }
    }
}