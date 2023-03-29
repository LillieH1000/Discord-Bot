const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globals = require('../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sloth')
		.setDescription('Posts a random sloth picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const res = await fetch('https://sloth.pics/api/');
        if (res.ok) {
            const data = await res.json();
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle('Sloth Pics')
                .setDescription('[Sloth Pics](https://sloth.pics/)')
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
	},
};