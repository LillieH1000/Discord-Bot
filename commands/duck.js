const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('duck')
		.setDescription('Posts a random duck picture'),
	async execute(interaction) {
        await interaction.deferReply();
        var option = _.sample([1, 2]);
        if (option == 1) {
            const res = await fetch('https://random-d.uk/api/v2/random');
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Duck Pics')
                    .setDescription('[Random-d](https://random-d.uk/)')
                    .setImage(data.url)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('View Original Image')
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 2) {
            const image = await globalsreddit.sfw('duck');
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Duck Pics')
                .setDescription('[r/Duck](https://www.reddit.com/r/duck/)')
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
        }
	},
};