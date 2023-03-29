const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globals = require('../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('amber')
		.setDescription('Posts a random amber picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit('ambermains');
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle('Amber Pics')
            .setDescription('[r/AmberMains](https://www.reddit.com/r/AmberMains/)')
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