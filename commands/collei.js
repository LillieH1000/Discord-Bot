const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globals = require('../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('collei')
		.setDescription('Posts a random collei picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit('colleimains');
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle('Collei Pics')
            .setDescription('[r/ColleiMains](https://www.reddit.com/r/ColleiMains/)')
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