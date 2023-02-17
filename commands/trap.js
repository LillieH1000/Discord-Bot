const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalscolours = require('../globals/colours.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trap')
		.setDescription('Posts a random cute anime boy trap picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globalsreddit.sfw('cutetraps');
        const embed = new EmbedBuilder()
            .setColor(globalscolours.embed)
            .setTitle('Trap Pics')
            .setDescription('[r/CuteTraps](https://www.reddit.com/r/CuteTraps/)')
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