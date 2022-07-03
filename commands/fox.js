const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

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
                .setColor('#FFC0DD')
                .setTitle('Fox Pics')
                .setDescription('[Random Fox](https://randomfox.ca/)')
                .setImage(data.image)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Original Image')
                        .setStyle('LINK')
                        .setURL(data.image)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};