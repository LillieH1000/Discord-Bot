const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalscolours = require('../globals/colours.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fox')
		.setDescription('Posts a random fox picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const res = await fetch('https://randomfox.ca/floof/');
        if (res.ok) {
            const data = await res.json();
            const embed = new EmbedBuilder()
                .setColor(globalscolours.embed)
                .setTitle('Fox Pics')
                .setDescription('[Random Fox](https://randomfox.ca/)')
                .setImage(data.image)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Original Image')
                        .setStyle(ButtonStyle.Link)
                        .setURL(data.image)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};