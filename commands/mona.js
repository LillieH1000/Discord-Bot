const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mona')
		.setDescription('Posts a random mona picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('mona');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Mona Pics')
            .setDescription('[r/mona](https://www.reddit.com/r/mona/)')
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