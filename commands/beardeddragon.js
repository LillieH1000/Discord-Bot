const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
const { redditapilimit } = require('../config.json');

async function images() {
    const res = await fetch(`https://www.reddit.com/r/beardeddragon.json?limit=${redditapilimit}`);
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
		.setName('beardeddragon')
		.setDescription('Posts a random bearded dragon picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const imageslist = await images();
        var image = _.sample(imageslist);
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Bearded Dragon Pics')
            .setDescription('[r/Bearded Dragons](https://www.reddit.com/r/BeardedDragon/)')
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
	},
};