const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ganyu')
		.setDescription('Posts a random ganyu picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('ganyu');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Ganyu Pics')
            .setDescription('[r/Ganyu](https://www.reddit.com/r/Ganyu/)')
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