const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('collei')
		.setDescription('Posts a random collei picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('colleimains');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
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