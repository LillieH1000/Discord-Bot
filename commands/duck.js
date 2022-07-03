const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('duck')
		.setDescription('Posts a random duck picture'),
	async execute(interaction) {
        await interaction.deferReply();
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
                        .setStyle('LINK')
                        .setURL(data.url)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};