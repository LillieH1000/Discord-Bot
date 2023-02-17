const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalscolours = require('../globals/colours.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eula')
		.setDescription('Posts a random eula picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('eulamains');
        const embed = new EmbedBuilder()
            .setColor(globalscolours.embed)
            .setTitle('Eula Pics')
            .setDescription('[r/EulaMains](https://www.reddit.com/r/EulaMains/)')
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