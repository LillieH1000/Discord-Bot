const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globals = require('../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('keqing')
		.setDescription('Posts a random keqing picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit('keqingmains');
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle('Keqing Pics')
            .setDescription('[r/KeqingMains](https://www.reddit.com/r/KeqingMains/)')
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