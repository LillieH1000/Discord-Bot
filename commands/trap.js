const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globals = require('../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trap')
		.setDescription('Posts a random cute anime boy trap picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit('cutetraps');
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
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