const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ayaka')
		.setDescription('Posts a random ayaka picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('ayakamains');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Ayaka Pics')
            .setDescription('[r/AyakaMains](https://www.reddit.com/r/AyakaMains/)')
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