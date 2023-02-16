const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('amber')
		.setDescription('Posts a random amber picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('ambermains');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
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