const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = async(client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
    
        try {
            for (const word of message.content.split(" ")) {
                const rx = /^https?:\/\/(.*)(twitter\.com|)\/(.*)$/;
                if (word.match(rx)) {
                    message.delete();
                    message.channel.send(message.content.replace("twitter.com", "vxtwitter.com"));
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};