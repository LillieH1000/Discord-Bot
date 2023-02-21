const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalscolours = require('../globals/colours.js');
var globalsmusic = require('../globals/music.js');

module.exports = async(client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
    
        try {
            for (const word of message.content.split(' ')) {
                const rx = /^http(?:s)?:\/\/(.*)spotify\.com\//;
                if (word.match(rx)) {
                    const components = await globalsmusic.components('spotify', 'url', word);
                    
                    if (components != null && components != undefined && components.length != 0) {
                        await message.reply({ components: components, allowedMentions: { repliedUser: false } });
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};