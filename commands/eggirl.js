const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
const { redditapilimit } = require('../config.json');

async function images() {
    const res = await fetch(`https://www.reddit.com/r/egg_irl.json?limit=${redditapilimit}`);
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
		.setName('egg_irl')
		.setDescription('Posts a random pic from egg_irl'),
	async execute(interaction) {
        await interaction.deferReply();
        const imageslist = await images();
        var image = _.sample(imageslist);
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('egg_irl Pics')
            .setDescription('[r/egg_irl](https://www.reddit.com/r/egg_irl/)')
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