const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emilia')
		.setDescription('Posts a random emilia picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('onetrueemilia');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Emilia Pics')
            .setDescription('[r/OneTrueEmilia](https://www.reddit.com/r/OneTrueEmilia/)')
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