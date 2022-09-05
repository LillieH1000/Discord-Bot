const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goose')
		.setDescription('Posts a random goose picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const res = await fetch('https://nekos.life/api/v2/img/goose');
        if (res.ok) {
            const data = await res.json();
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Goose Pics')
                .setDescription('[Nekos.Life](https://nekos.life/)')
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