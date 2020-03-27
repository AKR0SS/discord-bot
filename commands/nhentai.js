module.exports = {
    name: 'nhentai',
    description: 'send a random nhentai link',
    execute(message) {
        if(message.channel.nsfw == true)
            message.channel.send('https://nhentai.net/g/' + Math.round(Math.random() * 306586))
            
        else {
            message.channel.send("I can't send this in a chat that isn't nsfw you cuck :)")
            return;
        }
    }
}