const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globals = require('../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nilou')
		.setDescription('Posts a random nilou picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit('niloumains');
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle('Nilou Pics')
            .setDescription('[r/NilouMains](https://www.reddit.com/r/NilouMains/)')
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