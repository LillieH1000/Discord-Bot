const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('raiden')
		.setDescription('Posts a random raiden picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('raidenmains');
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Raiden Pics')
            .setDescription('[r/RaidenMains](https://www.reddit.com/r/RaidenMains/)')
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