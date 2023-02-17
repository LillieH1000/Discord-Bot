const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalscolours = require('../globals/colours.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beardeddragon')
		.setDescription('Posts a random bearded dragon picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('beardeddragon');
        const embed = new EmbedBuilder()
            .setColor(globalscolours.embed)
            .setTitle('Bearded Dragon Pics')
            .setDescription('[r/Bearded Dragons](https://www.reddit.com/r/BeardedDragon/)')
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