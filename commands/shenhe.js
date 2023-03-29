const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globals = require('../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shenhe')
		.setDescription('Posts a random shenhe picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit('shenhemains');
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
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