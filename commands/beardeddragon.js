const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globals = require('../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beardeddragon')
		.setDescription('Posts a random bearded dragon picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit('beardeddragon');
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle('Bearded Dragon Pics')
            .setDescription('[r/Bearded Dragons](https://www.reddit.com/r/BeardedDragon/)')
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