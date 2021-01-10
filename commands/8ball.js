const {
    version,
} = require('../config.json');

module.exports = {
    name: '8ball',
    description: 'Displays a random answer to a user question',
    execute(message, args, client) {
        if (args == '') {
            return message.channel.send('You have to ask me a question dumb ass :)');
        }

        const answers = ['Yes',
            'Sure, go ahead and make poor life decisions',
            'Fine, I\'ll approve of your poor life decisions',
            'No',
            'Only someone with 2 braincells would do that retard',
            'You genuinely couldn\'t have answered no by yourself?',
            'I could genuinely give less of a shit',
            'What the hell did I just read, ask that shit again',
            'Ask again or somethin, that was a dumb question',
        ];

        message.channel.send({
            embed: {
                color: 16102856,
                title: (answers[Math.floor(Math.random() * answers.length)]),
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: 'v' + version,
                },
            },
        });
    },
};