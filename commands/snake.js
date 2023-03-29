const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globals = require('../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snake')
		.setDescription('Posts a random snake picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit('snakes');
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle('Snake Pics')
            .setDescription('[r/Snakes](https://www.reddit.com/r/snakes/)')
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