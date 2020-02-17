module.exports = {
    name: 'help',
    description: 'it uh, helps?',
    execute(message, args) {
        message.channel.send(`${message.author.username} is a simp and needs help :)`)
    }
}