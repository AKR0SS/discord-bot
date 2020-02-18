module.exports = {
    name: 'skip',
    description: 'skips the video currently playing',
    execute(message, servers) {
        var server = servers[message.guild.id];

        if(server.dispactacher) 
            server.dispatcher.end();
    }
}