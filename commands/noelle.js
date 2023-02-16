const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('noelle')
		.setDescription('Posts a random noelle picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('noellemains');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Noelle Pics')
            .setDescription('[r/Noellemains](https://www.reddit.com/r/Noellemains/)')
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