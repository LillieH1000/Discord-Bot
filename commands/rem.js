const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rem')
		.setDescription('Posts a random rem picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('onetruerem');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Rem Pics')
            .setDescription('[r/OneTrueRem](https://www.reddit.com/r/OneTrueRem/)')
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