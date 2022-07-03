const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('birb')
		.setDescription('Posts a random birb picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const res = await fetch('https://api.alexflipnote.dev/birb');
        if (res.ok) {
            const data = await res.json();
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Birb Pics')
                .setDescription('[AlexFlipnote.Dev](https://alexflipnote.dev/)')
                .setImage(data.file)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Original Image')
                        .setStyle(ButtonStyle.Link)
                        .setURL(data.file)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};