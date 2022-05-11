const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = async(client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
    
        for (const word of message.content.split(" ")) {
            const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            if (word.match(rx)) {
                try {
                    const response = await axios.get('https://returnyoutubedislikeapi.com/votes?videoId='.concat(word.match(rx)[1]));
                    const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setDescription('Views: ' + response.data.viewCount.toLocaleString() + '\nLikes: ' + response.data.likes.toLocaleString() + '\nDislikes: ' + response.data.dislikes.toLocaleString())
                    .setTimestamp()
                    await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    });
};