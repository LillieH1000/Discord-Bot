const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
const { redditapilimit } = require('../config.json');

async function images(category) {
    var res;
    if (category == 'yuri') {
        res = await fetch(`https://www.reddit.com/r/wholesomeyuri.json?limit=${redditapilimit}`);
    } else if (category == 'yuritwo') {
        res = await fetch(`https://www.reddit.com/r/hololiveyuri.json?limit=${redditapilimit}`);
    }
    if (res.ok) {
        const images = [];
        const data = await res.json();
        data.data.children.forEach((child) => {
            if (child.data.over_18 == false) {
                if (child.data.url.endsWith('jpg') || child.data.url.endsWith('jpeg') || child.data.url.endsWith('png') || child.data.url.endsWith('gif')) {
                    images.push(child.data.url);
                }
            }
        });
        return images;
    } else {
        return null;
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yuri')
		.setDescription('Posts a random yuri picture'),
	async execute(interaction) {
        await interaction.deferReply();
        var option = _.sample([1, 2]);
        if (option == 1) {
            const imageslist = await images('yuri');
            var image = _.sample(imageslist);
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Yuri Pics')
                .setDescription('[r/Wholesome Yuri](https://www.reddit.com/r/wholesomeyuri/)')
                .setImage(image)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Original Image')
                        .setStyle(ButtonStyle.Link)
                        .setURL(image)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
        if (option == 2) {
            const imageslist = await images('yuritwo');
            var image = _.sample(imageslist);
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Yuri Pics')
                .setDescription('[r/Hololive Yuri](https://www.reddit.com/r/HololiveYuri/)')
                .setImage(image)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Original Image')
                        .setStyle(ButtonStyle.Link)
                        .setURL(image)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};