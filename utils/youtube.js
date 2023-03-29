const { EmbedBuilder } = require('discord.js');
var globals = require('../globals.js');

module.exports = async(client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
    
        try {
            for (const word of message.content.split(" ")) {
                const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
                if (word.match(rx)) {
                    const res = await fetch('https://returnyoutubedislikeapi.com/votes?videoId='.concat(word.match(rx)[1]));
                    if (res.ok) {
                        const data = await res.json();

                        const embed = new EmbedBuilder()
                            .setColor(globals.embedcolour)
                            .setDescription('Views: ' + data.viewCount.toLocaleString() + '\nLikes: ' + data.likes.toLocaleString() + '\nDislikes: ' + data.dislikes.toLocaleString())
                            .setTimestamp()

                        await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};