const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yuri')
		.setDescription('Posts a random yuri picture'),
	async execute(interaction) {
        await interaction.deferReply();
        var option = _.sample([1, 2]);
        if (option == 1) {
            const image = await globalsreddit.sfw('wholesomeyuri');
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Yuri Pics')
                .setDescription('[r/Wholesome Yuri](https://www.reddit.com/r/wholesomeyuri/)')
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
            const image = await globalsreddit.sfw('hololiveyuri');
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Yuri Pics')
                .setDescription('[r/Hololive Yuri](https://www.reddit.com/r/HololiveYuri/)')
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