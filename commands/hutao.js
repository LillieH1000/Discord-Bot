const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hutao')
		.setDescription('Posts a random hutao picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('hutao_mains');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Hu Tao Pics')
            .setDescription('[r/HuTao_Mains](https://www.reddit.com/r/HuTao_Mains/)')
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