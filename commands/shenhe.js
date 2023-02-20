const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalscolours = require('../globals/colours.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shenhe')
		.setDescription('Posts a random shenhe picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('shenhemains');
        const embed = new EmbedBuilder()
            .setColor(globalscolours.embed)
            .setTitle('Shenhe Pics')
            .setDescription('[r/ShenheMains](https://www.reddit.com/r/ShenheMains/)')
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