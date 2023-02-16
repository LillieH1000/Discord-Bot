const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lillie')
		.setDescription('Posts a random lillie (pokemon) picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('lillie');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Lillie Pics')
            .setDescription('[r/Lillie](https://www.reddit.com/r/Lillie/)')
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