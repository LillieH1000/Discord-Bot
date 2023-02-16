const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('menhera')
		.setDescription('Posts a random menhera picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('menhera');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Menhera Pics')
            .setDescription('[r/menhera](https://www.reddit.com/r/menhera/)')
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