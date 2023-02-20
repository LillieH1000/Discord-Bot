const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
var globalscolours = require('../globals/colours.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ganyu')
		.setDescription('Posts a random ganyu picture'),
	async execute(interaction) {
        await interaction.deferReply();
        var option = _.sample([1, 2]);
        if (option == 1) {
            const image = await globalsreddit.sfw('ganyu');
            const embed = new EmbedBuilder()
                .setColor(globalscolours.embed)
                .setTitle('Ganyu Pics')
                .setDescription('[r/Ganyu](https://www.reddit.com/r/Ganyu/)')
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
        if (option == 2) {
            const image = await globalsreddit.sfw('ganyusimps');
            const embed = new EmbedBuilder()
                .setColor(globalscolours.embed)
                .setTitle('Ganyu Pics')
                .setDescription('[r/GanyuSimps](https://www.reddit.com/r/GanyuSimps/)')
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